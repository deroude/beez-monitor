import { Text, Button } from '@rneui/themed'
import useAuth from './services/use-auth'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API_BASE } from '@env';
import useMeasurementApi from './services/use-measurement-api';

export default function App() {

  const { doLogin,
    doLogout,
    tokenObject,
    loading } = useAuth()

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (!tokenObject) {
    return <Button onPress={() => doLogin()}>Login</Button>
  } else {

    const httpLink = createHttpLink({
      uri: API_BASE,
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${tokenObject.accessToken}`
        }
      }
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });

    const { loading, data } = useMeasurementApi({ devices: ["8efc7eeb-ccd6-4a81-864d-33ad7e645ee2"] })

    return <ApolloProvider client={client}>
      <Text>{JSON.stringify(data, null, '\t')}</Text>
      <Button onPress={() => doLogout()}>Logout</Button>
    </ApolloProvider >
  }
}