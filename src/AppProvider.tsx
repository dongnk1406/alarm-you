import {ThemeProvider} from '@shopify/restyle';
import React, {useState} from 'react';
import {PropsWithChildren} from 'react';
import {darkTheme, lightTheme} from './theme';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const navigationRef = createNavigationContainerRef();

const AppProvider = ({children}: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <SafeAreaProvider>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            {children}
          </ThemeProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppProvider;
