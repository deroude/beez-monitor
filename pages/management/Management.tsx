import { View } from "react-native";
import useAuth from "../../services/use-auth";
import { Button } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

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

    return <View>
        <Button onPress={() => logout()}>Logout</Button>
    </View>
}

export default Management;