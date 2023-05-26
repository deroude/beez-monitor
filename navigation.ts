import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// https://reactnavigation.org/docs/typescript/

export type RootStackParamList = {
    Home: NavigatorScreenParams<HomeTabParamList>|undefined;
    Login: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
    Status: undefined;
    Charts: undefined;
    Logs: undefined;
    Management: undefined;
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace ReactNavigation {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface RootParamList extends RootStackParamList { }
    }
}