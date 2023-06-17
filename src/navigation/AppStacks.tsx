import React from 'react';
import {MapScreen} from 'src/containers';
import HomeScreen from 'src/containers/HomeScreen';
import {Stack} from './Navigators';

export const AppStacks = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Group>
  );
};
