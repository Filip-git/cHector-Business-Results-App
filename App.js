import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigation/Navigator';
import { UserProvider } from './context/userContext';

export default function App() {

  return (
    <>
      <UserProvider>
        <StatusBar style='light' />
        <Navigator />
      </UserProvider>
    </>

  );

}

