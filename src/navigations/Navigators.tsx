import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppStacks} from './AppStacks';

export const Stack = createNativeStackNavigator();

export const Navigators = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      {AppStacks()}
    </Stack.Navigator>
  );
};
