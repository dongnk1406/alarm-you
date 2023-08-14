import {createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppStacks} from './AppStacks';
import {GuestStacks} from './GuestStacks';
import {AllStackParamList} from './config/types';
import {useAppSelector} from 'src/redux/hooks';

export const Stack = createNativeStackNavigator<AllStackParamList>();
export const navigationRef = createNavigationContainerRef();

export const Navigation = () => {
  const token = useAppSelector(state => state.auth.userToken);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        navigationBarHidden: true,
      }}
      initialRouteName="SignInScreen">
      {token ? AppStacks() : GuestStacks()}
    </Stack.Navigator>
  );
};
