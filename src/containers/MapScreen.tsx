import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';

export function MapScreen(): JSX.Element {
  const navigation = useNavigation();
  const areaInsets = useSafeAreaInsets();
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          alignSelf: 'flex-start',
          padding: 8,
          borderRadius: 8,
          marginLeft: 16,
          marginTop: areaInsets.top || 30,
        }}
        onPress={() => navigation.goBack()}>
        <Text>{t('common.back')}</Text>
      </TouchableOpacity>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{...StyleSheet.absoluteFillObject, zIndex: -1}}
        region={region}
      />
    </View>
  );
}
