import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../pages/Login';
import Home from '../pages/Home';
import KPIScreen from '../pages/KPIScreen';
import Goals from '../pages/GoalsPages/Goals';
import Account from '../pages/AccountPages/Account';
import EditAccount from '../pages/AccountPages/EditAccount';
import AddGoal from '../pages/GoalsPages/AddGoal';
import Tasks from '../pages/TaskPages/Tasks';
import AddTask from '../pages/TaskPages/AddTask';


export default function Navigator() {
  const Stack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();
  function Tabs() {
    return (<BottomTab.Navigator>
      <BottomTab.Group screenOptions={{
        tabBarItemStyle: {
          paddingLeft: 25,
          paddingRight: 25,
          marginLeft: 15,
          marginRight: 15,
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
          tabBarIcon: ({ color, size }) => (<Ionicons name='home-outline' color={color} size={size} />),
        }} />
        <BottomTab.Screen name='KPIScreen' component={KPIScreen} options={{
          tabBarIcon: ({ color, size }) => (<Octicons name='graph' color={color} size={size} />),
        }} />
        <BottomTab.Screen name='Goals' component={GoalsStack} options={{
          tabBarIcon: ({ color, size }) => (<FontAwesome5 name='medal' color={color} size={size} />),
        }} />
        <BottomTab.Screen name='Tasks' component={TasksStack} options={{
          tabBarIcon: ({ color, size }) => (<FontAwesome5 name='tasks' color={color} size={size} />),
        }} />
        <BottomTab.Screen name='Account' component={AccountStack} options={{
          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name='account-circle-outline' color={color} size={size} />),
        }} />

      </BottomTab.Group>
    </BottomTab.Navigator>);
  }
  function AccountStack() {
    return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name='AccountStack' component={Account} options={{ headerShown: false }} />
          <Stack.Screen name='EditAccount' component={EditAccount} options={{ headerShown: false }} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }
  function GoalsStack() {
    return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name='GoalsStack' component={Goals} options={{ headerShown: false }} />
          <Stack.Screen name='AddGoal' component={AddGoal} options={{ headerShown: false }} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }
  function TasksStack() {
    return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name='TasksStack' component={Tasks} options={{ headerShown: false }} />
          <Stack.Screen name='AddTask' component={AddTask} options={{ headerShown: false }} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }
  return (
    <>
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
  )
}

