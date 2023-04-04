import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './pages/Login';
import Home from './pages/Home';
import KPIScreen from './pages/KPIScreen';
import Goals from './pages/Goals';
import Account from './pages/Account';


export default function App() {

  const Stack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();
  function Tabs() {
    return (<BottomTab.Navigator>
      <BottomTab.Group screenOptions={{
        tabBarItemStyle:{
          marginLeft:25,
          marginRight:25,
          marginBottom: 2,
          borderRadius: 10,
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: '#4A3780',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
        headerTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#4A3780',
          padding: 3
        },
        tabBarActiveBackgroundColor: '#c5b0ff4d',
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ffffff',
      }} >
        
        <BottomTab.Screen name='Home' component={Home} options={{
          tabBarIcon: ({color,size}) => (<Ionicons name='home-outline' color={color} size={size} />),
        }} />
        <BottomTab.Screen name='KPIScreen' component={KPIScreen} options={{
          tabBarIcon: ({color,size}) => (<Octicons name='graph' color={color} size={size} />),
        }} />
        <BottomTab.Screen name='Goals' component={Goals} options={{
          tabBarIcon: ({color,size}) => (<FontAwesome5 name='tasks' color={color} size={size} />),
        }} />
        <BottomTab.Screen name='Account' component={Account} options={{
          tabBarIcon: ({color,size}) => (<MaterialCommunityIcons name='account-circle-outline' color={color} size={size} />),
        }} />

      </BottomTab.Group>
    </BottomTab.Navigator>);
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#4A3780',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'normal', fontSize: 25 },
            headerTintColor: '#ffffff',
          }}>
            <Stack.Screen name='Login' component={Login} options={{ headerTitle: ' ' }} />
            <Stack.Screen name='cHector' component={Tabs} />
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
