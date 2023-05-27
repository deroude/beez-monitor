import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusStackParamList } from "../../navigation";
import DeviceList from "./DeviceList";
import DeviceAdd from "./DeviceAdd";

const Stack = createNativeStackNavigator<StatusStackParamList>();

const Device = () => {

    return (<Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DeviceList" component={DeviceList} />
        <Stack.Screen name="DeviceAdd" component={DeviceAdd} />
    </Stack.Navigator>);
}
export default Device;