import React from 'react';
import {Stack} from './AppNavigation';
import {SignInScreen, SignUpScreen} from 'src/screens';

export const GuestStacks = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Group>
  );
};
