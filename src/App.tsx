import { ThemeProvider } from '@shopify/restyle';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Config from 'react-native-config';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { darkTheme, lightTheme } from 'src/theme';

function App(): JSX.Element {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{flex: 1}}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
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
    </ThemeProvider>
  );
}

export default App;
