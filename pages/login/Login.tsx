import { Button } from "@rneui/themed";
import useAuth from "../../services/use-auth";
import { RootStackScreenProps } from "../../navigation";
import { View } from "react-native";
import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import styles from './login.scss'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import LogoSvg from './logo.svg';
import { useTranslation } from "react-i18next";

const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
    const { doLogin,
        tokenObject,
        loading } = useAuth();

    useEffect(() => {
        if (!!tokenObject)
            navigation.navigate('Home')
    }, [tokenObject])

    const { t } = useTranslation();

    return <View style={styles.container}>
        <LogoSvg width={'60%'} />
        {!loading && <Button size="lg" onPress={() => doLogin()}>{t('login')}</Button>}
    </View>
}

export default Login;