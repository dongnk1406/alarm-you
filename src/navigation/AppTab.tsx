import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatScreen, HomeScreen} from 'src/containers';
import {BottomTabsParamList} from './config/types';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const AppTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
    </Tab.Navigator>
  );
};
