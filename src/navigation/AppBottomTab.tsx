import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Images} from 'src/assets/images';
import {AppImage} from 'src/components/common';
import {useAppSelector} from 'src/redux/hooks';
import {
  ChartScreen,
  HomeScreen,
  SettingScreen,
  CameraScreen,
} from 'src/screens';
import {BottomTabsParamList} from './configs/types';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const AppBottomTab = () => {
  const userData = useAppSelector(state => state.auth.user);

  const renderAppIcon = () => {
    return (
      <AppImage
        source={Images.houseGuestHost}
        style={{width: 36, height: 36, borderRadius: 18}}
        resizeMode="contain"
        withSkeletonLoading={false}
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
        name="ChartScreen"
        component={ChartScreen}
        options={{
          tabBarLabel: 'Chart',
          tabBarIcon: renderAppIcon,
        }}
      />
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Camera',
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
