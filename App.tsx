import { useState, useEffect } from 'react'
import { Text, Button } from '@rneui/themed'
import useAuth from './services/use-auth'


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
    return <Button onPress={() => doLogout()}>Logout</Button>
  }
}