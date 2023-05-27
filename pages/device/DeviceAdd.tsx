import { Button, Input } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useDeviceApi } from "../../services/use-device-api";
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { StatusStackParamList } from "../../navigation";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import styles from './device-add.scss'

const DeviceAdd = () => {

    const { t } = useTranslation();
    const nav = useNavigation<NavigationProp<StatusStackParamList>>();
    const route = useRoute<RouteProp<{ params: { factoryToken?: string } }>>();
    const { activateDevice } = useDeviceApi();

    const [factoryToken, setFactoryToken] = useState<string | undefined>()
    const [name, setName] = useState<string | undefined>()
    const [error, setError] = useState<string[]>([])

    useEffect(() => {
        if (route.params?.factoryToken) {
            setFactoryToken(route.params.factoryToken);
        }
    }, [route])

    const save = async () => {
        if (!factoryToken || !name) {
            setError([...!factoryToken ? ["factoryToken"] : [], ...!name ? ["name"] : []])
            return;
        }
        await activateDevice(factoryToken, name);
        nav.navigate('DeviceList');
    }

    return <View>
        <Input onChangeText={setFactoryToken}
            value={factoryToken}
            placeholder={t('input-factory-token') || undefined}
            errorMessage={error.includes('factoryToken') && t('error-field-required') || undefined}
        />
        <Input onChangeText={setName}
            placeholder={t('input-device-name') || undefined}
            errorMessage={error.includes('name') && t('error-field-required') || undefined}
        />
        <Button onPress={() => save()}>{t('save')}</Button>
    </View>
}

export default DeviceAdd;
