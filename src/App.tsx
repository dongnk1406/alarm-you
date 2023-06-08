import {ThemeProvider} from '@shopify/restyle';
import React, {useEffect, useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  UIManager,
  View,
} from 'react-native';
import Config from 'react-native-config';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {darkTheme, lightTheme} from 'src/theme';
import {StyledBox, StyledImage, StyledText} from 'src/components';

function App(): JSX.Element {
  const [darkMode, setDarkMode] = useState(false);
  const [showMap, setShowMap] = useState<boolean>(true);

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <ScrollView style={{flex: 1}}>
        <StyledImage
          source={{
            uri: 'https://images.unsplash.com/photo-1681052027179-5471edd589c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
          }}
          style={{width: '100%', height: 300}}
        />
        <Switch
          value={showMap}
          onValueChange={value => {
            LayoutAnimation.easeInEaseOut();
            setShowMap(value);
          }}
        />
        {showMap && (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{width: '100%', height: 300}}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
        )}
        <StyledBox
          accessible={true}
          accessibilityLabel="A custom accessible view"
          accessibilityHint="Tap to perform an action.">
          <StyledText variant="body" selectable>
            Hello ab da ajksf afnsoi fnsafnd
          </StyledText>
        </StyledBox>
      </ScrollView>
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
