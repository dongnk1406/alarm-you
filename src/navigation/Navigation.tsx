import {createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {AppStacks} from './AppStacks';
import {GuestStacks} from './GuestStacks';
import {AllStackParamList} from './types';

export const Stack = createNativeStackNavigator<AllStackParamList>();
export const navigationRef = createNavigationContainerRef();

export const Navigation = () => {
  const [token, setToken] = useState<string | undefined>();
  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SignInScreen">
      {token ? AppStacks() : GuestStacks()}
    </Stack.Navigator>
  );
};
