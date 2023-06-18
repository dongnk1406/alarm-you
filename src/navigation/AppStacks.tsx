import React from 'react';
import {MapScreen} from 'src/containers';
import {AppTab} from './AppTab';
import {Stack} from './Navigation';

export const AppStacks = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="AppTab" component={AppTab} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Group>
  );
};
