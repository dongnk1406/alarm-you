import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import React, {PropsWithChildren, useEffect} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {navigationRef} from 'src/navigation';
import mmkvStorage from 'src/redux/mmkvStorage';
import {setDarkTheme} from 'src/redux/slices';
import store, {persistor} from 'src/redux/store';
import {LocalStorageConstant} from 'src/shared/constants';
import {DarkTheme, LightTheme} from 'src/theme';

const AppProvider = ({children}: PropsWithChildren) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  useEffect(() => {
    store.dispatch(setDarkTheme(scheme === 'dark'));
  }, [scheme]);

  return (
    <React.StrictMode>
      <GestureHandlerRootView style={styles.container}>
        <ReduxProvider store={store}>
          <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
            <NavigationContainer
              ref={navigationRef}
              onStateChange={state =>
                mmkvStorage.setItem(
                  LocalStorageConstant.NAVIGATION_STATE,
                  JSON.stringify(state),
                )
              }>
              <ThemeProvider theme={theme}>
                <BottomSheetModalProvider>
                  <SafeAreaProvider>
                    <StatusBar
                      barStyle={
                        scheme === 'dark' ? 'light-content' : 'dark-content'
                      }
                      animated
                      showHideTransition="fade"
                      backgroundColor={'transparent'}
                      // translucent
                    />
                    {children}
                  </SafeAreaProvider>
                </BottomSheetModalProvider>
              </ThemeProvider>
            </NavigationContainer>
          </PersistGate>
        </ReduxProvider>
      </GestureHandlerRootView>
    </React.StrictMode>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppProvider;
