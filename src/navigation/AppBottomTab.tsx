import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {AppImage} from 'src/components/common';
import {ChatScreen, HomeScreen, SettingScreen} from 'src/screens';
import {useAppSelector} from 'src/redux/hooks';
import {BottomTabsParamList} from './configs/types';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const AppBottomTab = () => {
  const userData = useAppSelector(state => state.auth.user);

  const renderAppIcon = () => {
    return (
      <AppImage
        source={{uri: userData?.avatar}}
        style={{width: 28, height: 28, borderRadius: 28}}
      />
    );
  };

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: renderAppIcon,
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: renderAppIcon,
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: renderAppIcon,
        }}
      />
    </Tab.Navigator>
  );
};
