import { Button, ListItem } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StatusStackParamList } from "../../navigation";
import { useDeviceApi } from "../../services/use-device-api";
import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import styles from './device-list.scss'

const DeviceList = () => {
    const { t } = useTranslation();
    const nav = useNavigation<NavigationProp<StatusStackParamList>>();
    const { myDevices } = useDeviceApi();

    useEffect(() => {
        const unsubscribe = nav.addListener('focus', () => {
            myDevices.refetch();
        });
        return unsubscribe;
    }, [nav])

    return <View>
        <Button
            icon={<Icons name="plus-circle" size={20} color='white' />}
            titleStyle={{ marginLeft: 10 }}
            onPress={() => nav.navigate('DeviceAdd')}
        >{t('add-device')}</Button>
        {(myDevices.data?.devices as any[] || []).map((device, i) => <ListItem key={i} containerStyle={styles.listItem}>
            <ListItem.Title>{device.name}</ListItem.Title>
        </ListItem>)}
    </View>
}

export default DeviceList;
