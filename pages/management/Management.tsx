import { View } from "react-native";
import useAuth from "../../services/use-auth";
import { Button } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const Management = () => {
    const { doLogin,
        doLogout,
        tokenObject,
        loading } = useAuth()
    
    const navigation = useNavigation();

    const logout = async () => {
        await doLogout();
        navigation.navigate('Login')
    }

    const {t} = useTranslation();

    return <View>
        <Button onPress={() => logout()}>{t('logout')}</Button>
    </View>
}

export default Management;