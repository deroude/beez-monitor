import { Button } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StatusStackParamList } from "../../navigation";
import { useDeviceApi } from "../../services/use-device-api";

const DeviceList = () => {
    const { t } = useTranslation();
    const nav = useNavigation<NavigationProp<StatusStackParamList>>();
    const { getMyDevices } = useDeviceApi();

    return <View>
        <Button
            icon={<Icons name="plus-circle" size={20} color='white' />}
            titleStyle={{ marginLeft: 10 }}
            onPress={() => nav.navigate('DeviceAdd')}
        >{t('add-device')}</Button>
    </View>
}

export default DeviceList;
