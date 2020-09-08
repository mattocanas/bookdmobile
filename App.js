import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {StateProvider} from './state/StateProvider';
import reducer, {initialState} from './state/reducer';
import {NavigationContainer} from '@react-navigation/native';
import {color} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tabs = createMaterialBottomTabNavigator();

function MyBottomTabs() {
  return (
    <Tabs.Navigator
      barStyle={{backgroundColor: '#222831', shadowRadius: 0}}
      activeColor="#55d077"
      inactiveColor="#c1c8d4"
      initialRouteName="Home">
      <Tabs.Screen
        options={{
          tabBarLabel: '',
          tabBarColor: '#222831',
          tabBarIcon: ({color}) => (
            <AntIcons name="home" color={color} size={28} />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tabs.Screen
        options={{
          tabBarLabel: '',
          tabBarColor: '#222831',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="telescope" color={color} size={28} />
          ),
        }}
        name="Search"
        component={HomeScreen}
      />
      <Tabs.Screen
        options={{
          tabBarLabel: '',
          tabBarColor: '#222831',
          tabBarIcon: ({color}) => (
            <SimpleLineIcons name="notebook" color={color} size={28} />
          ),
        }}
        name="Study"
        component={HomeScreen}
      />
      <Tabs.Screen
        options={{
          tabBarLabel: '',
          tabBarColor: '#222831',
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-person-circle-sharp" color={color} size={28} />
          ),
        }}
        name="Profile"
        component={HomeScreen}
      />
    </Tabs.Navigator>
  );
}

const AuthStack = createStackNavigator();

function MyAuthStack() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Signin" component={SigninScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

const switchNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: MyBottomTabs,
    Auth: MyAuthStack,
  },
  {
    initialRouteName: 'Loading',
  },
);
// const switchNavigator = createSwitchNavigator({
//   AuthStack: createStackNavigator({
//     Signin: SigninScreen,
//     Signup: SignupScreen,
//   }),
//   AppStack: createBottomTabNavigator({
//     Home: HomeScreen,
//   }),
// });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </StateProvider>
  );
};
