import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import Home from './pages/Home';


export default function App() {

  const Stack = createNativeStackNavigator();


  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={{headerStyle:{backgroundColor:'#4A3780'}, headerTitleAlign:'center',headerTitleStyle:{fontWeight:'bold',fontSize:25},headerTintColor:'#ffffff' }}>
            <Stack.Screen name='Login' component={Login} options={{headerTitle:' '}} />
            <Stack.Screen name='Home' component={Home} />
          </Stack.Group>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
