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
import {StateProvider} from './state/StateProvider';
import reducer, {initialState} from './state/reducer';
import {NavigationContainer} from '@react-navigation/native';
import {color} from 'react-native-reanimated';

import AntIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BrainstormCreate from './src/screens/BrainstormCreate';
import CurrentMeetings from './src/screens/CurrentMeetings';
import MapScreen from './src/screens/MapScreen';
import PeopleThereList from './src/screens/PeopleThereList';

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
        options={{headerShown: false}}
        name="Tabs"
        component={MyBottomTabs}
      />
      <MainStack.Screen
        name="LocationDetail"
        options={{
          headerStyle: {
            backgroundColor: '#222831',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
        }}
        component={LocationDetailScreen}
      />
      <MainStack.Screen
        name="BrainstormCreate"
        options={{
          headerStyle: {
            backgroundColor: '#222831',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
        }}
        component={BrainstormCreate}
      />
      <MainStack.Screen
        name="CurrentMeetings"
        options={{
          headerStyle: {
            backgroundColor: '#222831',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
        }}
        component={CurrentMeetings}
      />
      <MainStack.Screen
        name="MapScreen"
        options={{
          headerStyle: {
            backgroundColor: '#222831',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
        }}
        component={MapScreen}
      />
      <MainStack.Screen
        name="PeopleThereList"
        options={{
          headerStyle: {
            backgroundColor: '#222831',
          },
          headerTitleStyle: {
            color: '#c1c8d4',
          },
          headerBackTitleStyle: {
            color: '#c1c8d4',
            fontSize: 14,
          },
        }}
        component={PeopleThereList}
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
