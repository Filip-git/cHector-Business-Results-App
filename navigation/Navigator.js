import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../pages/Login';
import KPIScreen from '../pages/KPIScreen';
import Goals from '../pages/GoalsPages/Goals';
import Account from '../pages/AccountPages/Account';
import EditAccount from '../pages/AccountPages/EditAccount';
import AddGoal from '../pages/GoalsPages/AddGoal';
import Tasks from '../pages/TaskPages/Tasks';
import AddTask from '../pages/TaskPages/AddTask';
import getHeaderTitle from '../helper/getHeaderTitle';



export default function Navigator() {
  const Stack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();
  const styles = StyleSheet.create({
    backButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 50,
      height: 28,
      width: 28,
    },
    closeButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 50,
      height: 28,
      width: 28,
      marginLeft: 16,
    }
  });
  const CloseButton = (navigation, navigateTo) => {
    return (
      <TouchableOpacity style={styles.closeButton} onPress={() => {
        navigation.navigate(navigateTo);
      }}>
        <Ionicons name='close' color={'#4A3780'} size={25} />
      </TouchableOpacity>
    );
  };
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

        <BottomTab.Screen name='KPIScreen' component={KPIScreen} options={{
          tabBarIcon: ({ color, size }) => (<Octicons name='graph' color={color} size={size} />),
        }} />
        <BottomTab.Screen name='Goals' component={GoalsStack} options={({ route, navigation }) => ({
          tabBarIcon: ({ color, size }) => (<FontAwesome5 name='medal' color={color} size={size} />),
          headerShadowVisible: false,
          title: (getHeaderTitle(route) === 'Add new goal') ? getHeaderTitle(route) : 'Team Goals',
          headerLeft: (getHeaderTitle(route) === 'Add new goal') ? () => {
            return (
              CloseButton(navigation, 'GoalsStack')
            )
          } : () => { },
        })} />
        <BottomTab.Screen name='Tasks' component={TasksStack} options={({ route, navigation }) => ({
          tabBarIcon: ({ color, size }) => (<FontAwesome5 name='tasks' color={color} size={size} />),
          headerShadowVisible: false,
          title: (getHeaderTitle(route) === 'Add new task') ? getHeaderTitle(route) : 'My Tasks',
          headerLeft: (getHeaderTitle(route) === 'Add new task') ? () => {
            return (
              CloseButton(navigation, 'TasksStack')
            )
          } : () => { },
        })} />
        <BottomTab.Screen name='Account' component={AccountStack} options={({ route, navigation }) => ({
          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name='account-circle-outline' color={color} size={size} />),
          title: (getHeaderTitle(route) === 'Edit your profile') ? getHeaderTitle(route) : 'Account',
          headerLeft: (getHeaderTitle(route) === 'Edit your profile') ? () => {
            return (
              CloseButton(navigation, 'AccountStack')
            )
          } : () => { },
        })} />

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
        <Stack.Navigator id='cHector'>
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
            <Stack.Screen name='cHector' component={Tabs} options={({ route, navigation }) => ({
              headerTitle: getHeaderTitle(route),
              headerLeft: () => {
                return (
                  <TouchableOpacity style={styles.backButton} onPress={() => {
                    navigation.navigate('KPIScreen');
                  }}>
                    <Ionicons name='chevron-back' color={'#4A3780'} size={25} />
                  </TouchableOpacity>
                )
              }
            })} />
          </Stack.Group>
        </Stack.Navigator>

      </NavigationContainer>
    </>
  )
}

