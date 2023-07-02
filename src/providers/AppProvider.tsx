import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import React, {PropsWithChildren} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {navigationRef} from 'src/navigation';
import store, {persistor} from 'src/redux/store';
import {lightTheme} from 'src/theme';

const AppProvider = ({children}: PropsWithChildren) => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <SafeAreaProvider>
              <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
            </SafeAreaProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppProvider;
