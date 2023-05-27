import { useEffect, useState } from 'react';
import {
    AuthRequestPromptOptions,
    AuthSessionResult,
    exchangeCodeAsync,
    makeRedirectUri,
    ResponseType,
    revokeAsync,
    TokenResponse,
    useAuthRequest,
    useAutoDiscovery
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { ENV, OPENID_CLIENTID, OPENID_ISSUER, APP_SCHEME, APP_ID, API_BASE } from '@env';
import { openAuthSessionAsync } from 'expo-web-browser';
import Constants from 'expo-constants';

// https://gist.github.com/thedewpoint/181281f8cbec10378ecd4bb65c0ae131

WebBrowser.maybeCompleteAuthSession();

const isDevelopment = ENV === 'development';

//TODO: study migration to dev-client: https://github.com/expo/fyi/blob/main/auth-proxy-migration.md

const redirectConfig = isDevelopment && !Constants.platform?.web ? {
    useProxy: true,
    projectNameForProxy: '@beez-watcher/client'
} : {
    useProxy: false,
    scheme: APP_SCHEME
}

const redirectUri = makeRedirectUri(redirectConfig);
console.log(redirectUri)

export interface UseAuth {
    doLogin: (options?: AuthRequestPromptOptions) => Promise<AuthSessionResult>,
    doLogout: () => Promise<void>,
    tokenObject?: TokenResponse,
    loading: boolean,
    realmAccessToken?: string,
    userId?: string
}

export function useAuth(): UseAuth {

    const asyncStorage = useAsyncStorage("@token");

    const discovery = useAutoDiscovery(OPENID_ISSUER);

    const [tokenObject, setTokenObject] = useState<TokenResponse | undefined>();

    const [loading, setLoading] = useState<boolean>(true);

    const [realmAccessToken, setRealmAccessToken] = useState<string | undefined>();

    const [userId, setUserId] = useState<string | undefined>();

    const [request, result, promptAsync] = useAuthRequest(
        {
            clientId: OPENID_CLIENTID,
            redirectUri,
            responseType: ResponseType.Code,
            scopes: ['profile', 'email', 'offline_access'],
            usePKCE: true,
            extraParams: {
                audience: APP_ID
            }
        },
        discovery
    );

    useEffect(() => {
        const checkToken = async (): Promise<TokenResponse | undefined> => {
            const cachedToken = await asyncStorage.getItem();
            if (!cachedToken || !discovery) return Promise.resolve(undefined);
            let tokenObject: TokenResponse = new TokenResponse(JSON.parse(cachedToken));
            try {
                if (tokenObject.shouldRefresh()) {
                    tokenObject = await tokenObject.refreshAsync({
                        clientId: OPENID_CLIENTID,
                    }, discovery);
                }
            } catch (err) {
                await asyncStorage.removeItem();
                return Promise.resolve(undefined);
            }
            await asyncStorage.setItem(JSON.stringify(tokenObject.getRequestConfig()));
            return Promise.resolve(tokenObject);
        }

        if (!discovery) return;

        checkToken().then(response => {
            setTokenObject(response);
            setLoading(false);
        })
    }, [discovery])

    useEffect(() => {
        if (discovery && request && result && result.type === 'success') {
            exchangeCodeAsync(
                {
                    code: result.params.code,
                    clientId: OPENID_CLIENTID,
                    redirectUri,
                    extraParams: {
                        code_verifier: request.codeVerifier || "",
                    },
                },
                discovery
            ).then((response) => {
                setTokenObject(response);
                asyncStorage.setItem(JSON.stringify(response.getRequestConfig()));
            }).catch(console.log);
        }
    }, [result]);

    const fetchRealmAccessToken = async () => {
        const tokenResult = await fetch(`${API_BASE}/auth/providers/custom-token/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: tokenObject?.accessToken })
        });

        return tokenResult.json();
    }

    useEffect(() => {
        if (!tokenObject?.accessToken) return;
        fetchRealmAccessToken().then(({ access_token, user_id }: { access_token: string, user_id: string }) => {
            setRealmAccessToken(access_token);
            setUserId(user_id);
        });
    }, [tokenObject])

    const doLogout = async () => {
        if (!tokenObject || !discovery) return;
        if (tokenObject.refreshToken)
            await revokeAsync({ clientId: OPENID_CLIENTID, token: tokenObject.refreshToken }, discovery);
        await openAuthSessionAsync(`${OPENID_ISSUER}/v2/logout?client_id=${OPENID_CLIENTID}&returnTo=${window.location.href}`);
        await asyncStorage.removeItem();
        setTokenObject(undefined);
    }

    return {
        doLogin: async () => promptAsync(redirectConfig),
        doLogout,
        tokenObject,
        realmAccessToken,
        userId,
        loading
    }
}

export default useAuth;
