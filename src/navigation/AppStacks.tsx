// https://github.com/gre/react-native-view-shot/blob/master/example/Example/src/screens.js

import React from 'react';
import {MapScreen, SearchChatUserScreen, SingleChatScreen} from 'src/screens';
import {Stack} from './AppNavigation';
import {AppTab} from './AppTab';

export const AppStacks = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="AppTab" component={AppTab} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="SingleChatScreen" component={SingleChatScreen} />
      <Stack.Screen
        name="SearchChatUserScreen"
        component={SearchChatUserScreen}
      />
    </Stack.Group>
  );
};
