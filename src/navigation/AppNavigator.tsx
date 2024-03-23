import {createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useAppSelector} from 'src/redux/hooks';
import {AppStacks} from './AppStacks';
import {GuestStacks} from './GuestStacks';
import {AllStackParamList} from './configs/types';
import {useNotificationBoot} from 'src/services/notification';

export const Stack = createNativeStackNavigator<AllStackParamList>();
export const navigationRef = createNavigationContainerRef();

export const AppNavigator = () => {
  useNotificationBoot();

  const userToken = useAppSelector(state => state.auth.userToken);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="AppBottomTab">
      {/* {userToken ? AppStacks() : GuestStacks()} */}
      {AppStacks()}
    </Stack.Navigator>
  );
};
