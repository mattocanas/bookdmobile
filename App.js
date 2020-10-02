import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import Profile from './src/screens/Profile';
import LocationDetailScreen from './src/screens/LocationDetailScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {StateProvider} from './state/StateProvider';
import reducer, {initialState} from './state/reducer';
import {NavigationContainer} from '@react-navigation/native';
import {color} from 'react-native-reanimated';
import Logo from './static/Logo2.png';

import AntIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BrainstormCreate from './src/screens/BrainstormCreate';
import CurrentMeetings from './src/screens/CurrentMeetings';
import MapScreen from './src/screens/MapScreen';
import PeopleThereList from './src/screens/PeopleThereList';
import UserDetailScreen from './src/screens/UserDetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import FollowingListScreen from './src/screens/FollowingListScreen';

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
        component={SearchScreen}
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
        component={Profile}
      />
    </Tabs.Navigator>
  );
}

const MainStack = createStackNavigator();
function MyMainStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#272c36',
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
            fontSize: 22,
          },
        }}
        name="book'd"
        component={MyBottomTabs}
      />
      <MainStack.Screen
        name="LocationDetail"
        options={{
          headerStyle: {
            backgroundColor: '#272c36',
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
          headerTintColor: '#c1c8d4',
          title: "book'd",
          headerBackTitleVisible: false,
        }}
        component={LocationDetailScreen}
      />
      <MainStack.Screen
        name="BrainstormCreate"
        options={{
          headerStyle: {
            backgroundColor: '#272c36',
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
          headerTintColor: '#c1c8d4',
          title: 'Create a meeting',
          headerBackTitleVisible: false,
        }}
        component={BrainstormCreate}
      />
      <MainStack.Screen
        name="CurrentMeetings"
        options={{
          headerStyle: {
            backgroundColor: '#272c36',
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
          headerTintColor: '#c1c8d4',
          title: 'Current meetings',
          headerBackTitleVisible: false,
        }}
        component={CurrentMeetings}
      />
      <MainStack.Screen
        name="MapScreen"
        options={{
          headerStyle: {
            backgroundColor: '#272c36',
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
          headerTintColor: '#c1c8d4',
          title: "book'd",
          headerBackTitleVisible: false,
        }}
        component={MapScreen}
      />
      <MainStack.Screen
        name="PeopleThereList"
        options={{
          headerStyle: {
            backgroundColor: '#272c36',
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
          headerBackTitleStyle: {
            color: '#c1c8d4',
          },
          headerTintColor: '#c1c8d4',
          title: "book'd",
          headerBackTitleVisible: false,
        }}
        component={PeopleThereList}
      />
      <MainStack.Screen
        name="UserDetailScreen"
        options={{
          headerStyle: {
            backgroundColor: '#272c36',
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
          headerBackTitleStyle: {
            color: '#c1c8d4',
            fontSize: 14,
          },
          title: "book'd",
          headerBackTitleVisible: false,
        }}
        component={UserDetailScreen}
      />

      <MainStack.Screen
        name="FollowingListScreen"
        options={{
          headerStyle: {
            backgroundColor: '#272c36',
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
          headerBackTitleStyle: {
            color: '#c1c8d4',
            fontSize: 14,
          },
          title: "book'd",
          headerBackTitleVisible: false,
        }}
        component={FollowingListScreen}
      />
    </MainStack.Navigator>
  );
}

const AuthStack = createStackNavigator();

function MyAuthStack() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Signin"
        options={{
          headerStyle: {
            backgroundColor: '#222831',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
        }}
        tabBarLabel="book'd"
        component={SigninScreen}
      />
      <AuthStack.Screen
        name="Signup"
        options={{
          headerStyle: {
            backgroundColor: '#222831',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
        }}
        tabBarLabel="book'd"
        component={SignupScreen}
      />
    </AuthStack.Navigator>
  );
}

const switchNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: MyMainStack,
    Auth: MyAuthStack,
  },
  {
    initialRouteName: 'Loading',
  },
);

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
