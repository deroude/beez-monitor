import { gql, useQuery } from "@apollo/client";
import { HTTP_ENDPOINT_BASE } from "@env";
import useAuth from "./use-auth";

const DEVICE_QUERY = gql`
    query DeviceQuery{
        device {
            status
            name            
        }
    }
`

export function useDeviceApi() {

    const { realmAccessToken } = useAuth();

    return {
        getMyDevices: useQuery(DEVICE_QUERY),
        activateDevice: async (factoryToken: string, name: string): Promise<any> => {
            if (!realmAccessToken) {
                return Promise.reject(new Error('Cannot send unauthorized request'));
            }
            return fetch(`${HTTP_ENDPOINT_BASE}/activate`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + realmAccessToken
                },
                body: JSON.stringify({ factoryToken, name })
            })
        }
    }
}