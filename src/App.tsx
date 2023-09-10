import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, UIManager, View} from 'react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import {AppDisconnect} from 'src/components/common';
import {AppNavigation} from 'src/navigation';
import AppProvider from 'src/providers';
import {withCodePushHOC} from 'src/services/codepush';
import 'src/utils/i18next';

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
      <Toast />
      <AppDisconnect />

      {Config.MODE !== 'LIVE' && (
        <View style={styles.mode}>
          <Text style={{color: 'black'}}>{Config.MODE}</Text>
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
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#FF0000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
