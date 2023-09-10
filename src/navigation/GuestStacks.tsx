import React from 'react';
import {SignInScreen} from 'src/containers';
import {Stack} from './AppNavigation';

export const GuestStacks = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Group>
  );
};
