import {ThemeProvider} from '@shopify/restyle';
import React, {useState} from 'react';
import {PropsWithChildren} from 'react';
import {darkTheme, lightTheme} from './theme';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export const navigationRef = createNavigationContainerRef();

const AppProvider = ({children}: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          {children}
          <Toast />
        </ThemeProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default AppProvider;
