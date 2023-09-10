import React from 'react';
import {MapScreen, SignInScreen} from 'src/containers';
import {AppTab} from './AppTab';
import {Stack} from './AppNavigation';

export const AppStacks = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="AppTab" component={AppTab} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Group>
  );
};
