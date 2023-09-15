import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, UIManager, View} from 'react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import {AppDisconnect, AppLoading} from 'src/components/common';
import {AppNavigation} from 'src/navigation';
import AppProvider from 'src/services/providers';
import {withCodePushHOC} from 'src/services/codepush';
import {GlobalUIService} from 'src/services/globalUI';
import 'src/utils/i18next';
import {AppTheme} from './theme';

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
      <AppNavigation />
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
    backgroundColor: AppTheme.colors.white,
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
