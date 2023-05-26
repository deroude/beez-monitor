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

const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
    const { doLogin,
        doLogout,
        tokenObject,
        loading } = useAuth();

    useEffect(() => {
        if (!!tokenObject)
            navigation.navigate('Home')
    }, [tokenObject])

    return <View style={styles.container}>
        <LogoSvg width={'60%'} />
        {!loading && <Button size="lg" onPress={() => doLogin()}>Login</Button>}
    </View>
}

export default Login;