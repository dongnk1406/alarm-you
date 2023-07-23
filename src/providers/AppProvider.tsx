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
import {DarkTheme, LightTheme} from 'src/theme';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const AppProvider = ({children}: PropsWithChildren) => {
  const isDarkTheme = store.getState().common.isDarkTheme;
  const theme = isDarkTheme ? DarkTheme : LightTheme;
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <BottomSheetModalProvider>
              <SafeAreaProvider>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
              </SafeAreaProvider>
            </BottomSheetModalProvider>
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
