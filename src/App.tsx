import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, UIManager, View} from 'react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import {AppDisconnect, AppLoading} from './components/common';
import {withCodePushHOC} from './services/codepush';
import AppProvider from './services/providers';
import './services/i18next';
import {palette} from './theme';
import {AppNavigator} from './navigation/AppNavigator';
import {GlobalUIService} from './services/globalUI';

function App(): JSX.Element {
  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  return (
    <AppProvider>
      <AppNavigator />
      <AppDisconnect />
      <AppLoading ref={GlobalUIService.globalLoadingRef} />
      <Toast />

      {Config.MODE !== 'LIVE' && (
        <View style={styles.mode}>
          <Text style={styles.textMode}>{Config.MODE}</Text>
        </View>
      )}
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  mode: {
    position: 'absolute',
    top: 36,
    alignSelf: 'center',
    backgroundColor: palette.white,
    padding: 8,
    borderRadius: 8,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textMode: {
    color: 'black',
  },
});

const CODE_PUSH = Config.MODE === 'DEVELOP';
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

const _App = CODE_PUSH ? codePush(codePushOptions)(withCodePushHOC(App)) : App;

export default _App;
