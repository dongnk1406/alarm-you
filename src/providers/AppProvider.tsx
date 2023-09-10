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
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {navigationRef} from 'src/navigation';
import mmkvStorage from 'src/redux/mmkvStorage';
import {setDarkTheme} from 'src/redux/slices';
import store, {persistor} from 'src/redux/store';
import {StorageConstant} from 'src/shared/constants';
import {DarkTheme, LightTheme} from 'src/theme';

const AppProvider = ({children}: PropsWithChildren) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  useEffect(() => {
    store.dispatch(setDarkTheme(scheme === 'dark'));
  }, [scheme]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            onStateChange={state =>
              mmkvStorage.setItem(
                StorageConstant.NAVIGATION_STATE,
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
                  />
                  {children}
                </SafeAreaProvider>
              </BottomSheetModalProvider>
            </ThemeProvider>
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
