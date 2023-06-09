import React, {useEffect} from 'react';
import {Platform, Text, UIManager, View} from 'react-native';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import {StyledDisconnect} from 'src/components';
import {Navigation} from 'src/navigation';
import {useNotificationBoot} from 'src/services/notification';
import 'src/utils/i18next';
import AppProvider from 'src/providers';

function App(): JSX.Element {
  useNotificationBoot();

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
      <Navigation />
      <Toast />
      <StyledDisconnect />
      {Config.MODE !== 'LIVE' && (
        <View
          style={{
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
          }}>
          <Text>{Config.MODE}</Text>
        </View>
      )}
    </AppProvider>
  );
}

export default App;
