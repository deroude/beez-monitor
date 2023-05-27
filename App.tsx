import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home/Home';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { RootStackParamList, linking } from './navigation';
import Login from './pages/login/Login';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import styles from './app.scss';
import i18n from './translation';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { API_BASE } from '@env';
import { setContext } from '@apollo/client/link/context';
import useAuth from './services/use-auth';
import { I18nextProvider } from 'react-i18next';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = createTheme({
  lightColors: {
    primary: '#FF9666',
    secondary: '#174C4F',
    background: '#1D2541',
  },
  components: {
    Text: {
      style: {
        fontFamily: 'Exo 2',
      },
    },
  },
});

const App = () => {

  const graphQLLink = createHttpLink({
    uri:`${API_BASE}/graphql`,
  });

  const { realmAccessToken } = useAuth();

  const authLink = setContext((_, { headers }) => {
    if(!realmAccessToken) throw new Error('no auth');
    return {
      headers: {
        ...headers,
        Authorization: 'Bearer ' + realmAccessToken
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(graphQLLink),
    cache: new InMemoryCache()
  });

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <ApolloProvider client={client}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment
@ts-ignore */}
          <NavigationContainer linking={linking}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;