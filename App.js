import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {StateProvider} from './state/StateProvider';
import reducer, {initialState} from './state/reducer';

const AppStack = createBottomTabNavigator({
  Home: HomeScreen,
});

const AuthStack = createStackNavigator({
  Signin: SigninScreen,
  Signup: SignupScreen,
});

const switchNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
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
      <App />
    </StateProvider>
  );
};
