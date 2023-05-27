import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HTTP_ENDPOINT_BASE } from '@env';
import useMeasurementApi from '../../services/use-measurement-api';
import { Button, useTheme } from '@rneui/themed';
import useAuth from '../../services/use-auth';
import { HomeTabParamList, RootStackParamList, RootStackScreenProps } from '../../navigation';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import styles from './home.scss';
import Device from '../device/Device';
import Charts from '../charts/Charts';
import Logs from '../logs/Logs';
import Management from '../management/Management';
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const Tab = createBottomTabNavigator<HomeTabParamList>();

//https://icons.expo.fyi/

const MenuIcon = ({ color, size, name }: { color: string, size: number, name: string }) => <Icons name={name as any} size={size} color={color} />

const icons = {
  'Device': 'beehive-outline',
  'Charts': 'chart-bar',
  'Logs': 'view-list',
  'Management': 'cog-outline'
}

const Home = () => {

  const { theme } = useTheme();
  const { realmAccessToken } = useAuth();
  const nav = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!realmAccessToken) {
      nav.navigate('Login');
    }
  }, [nav, realmAccessToken])

  return (
    <Tab.Navigator sceneContainerStyle={styles.scene} screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIcon: props => <MenuIcon {...props} name={icons[route.name]} />,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.secondary,
      tabBarStyle: styles['tab-bar']
    })}>
      <Tab.Screen name="Device" component={Device} />
      <Tab.Screen name="Charts" component={Charts} />
      <Tab.Screen name="Logs" component={Logs} />
      <Tab.Screen name="Management" component={Management} />
    </Tab.Navigator>
  );
}

export default Home;