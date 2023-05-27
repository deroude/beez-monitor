import { LINKING_PREFIXES } from '@env';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// https://reactnavigation.org/docs/typescript/

export type RootStackParamList = {
    Home: NavigatorScreenParams<HomeTabParamList> | undefined;
    Login: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
    Device: undefined;
    Charts: undefined;
    Logs: undefined;
    Management: undefined;
};

export type StatusStackParamList = {
    DeviceList: undefined;
    DeviceAdd: undefined;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace ReactNavigation {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface RootParamList extends RootStackParamList { }
    }
}

export const linking = {
    prefixes: LINKING_PREFIXES.split(','),
    config: {
        screens: {
            Home: {
                path: '',
                initialRouteName: 'device',
                screens: {
                    Device: {
                        path: 'device',
                        initialRouteName: 'device-list',
                        screens: {
                            DeviceList: 'device-list',
                            DeviceAdd: 'device-add',
                        }
                    },
                    Charts: 'charts',
                    Logs: 'logs',
                    Management: 'manage'
                }
            },
            Login: 'login'
        }
    },
};