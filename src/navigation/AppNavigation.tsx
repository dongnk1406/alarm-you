import {createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useAppSelector} from 'src/redux/hooks';
import {AppStacks} from './AppStacks';
import {GuestStacks} from './GuestStacks';
import {AllStackParamList} from './config/types';
import {useNotificationBoot} from 'src/services/notification';
import {AppTheme} from 'src/theme';

export const Stack = createNativeStackNavigator<AllStackParamList>();
export const navigationRef = createNavigationContainerRef();

export const AppNavigation = () => {
  useNotificationBoot();

  const userToken = useAppSelector(state => state.auth.userToken);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        navigationBarColor: AppTheme.colors['neutral-white'],
      }}
      initialRouteName="SignInScreen">
      {userToken ? AppStacks() : GuestStacks()}
    </Stack.Navigator>
  );
};
