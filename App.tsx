import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home/Home';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { RootStackParamList } from './navigation';
import Login from './pages/login/Login';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import styles from './app.scss';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { API_BASE } from '@env';
import { setContext } from '@apollo/client/link/context';
import useAuth from './services/use-auth';

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
    uri: API_BASE,
  });

  const { tokenObject } = useAuth();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: tokenObject ? `Bearer ${tokenObject.accessToken}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(graphQLLink),
    cache: new InMemoryCache()
  });

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;