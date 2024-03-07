import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import permission from 'src/utils/permission';

function MapScreen(): JSX.Element {
  const navigation = useNavigation();
  const areaInsets = useSafeAreaInsets();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const getCurrentRegion = async () => {
    const hasPermission = await permission.requestLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const _position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          };
          setRegion(_position);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCurrentRegion();
    }, []),
  );

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
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}>
        <Marker
          title="Yor are here"
          description={`${region.latitude}, ${region.longitude}`}
          coordinate={region}
        />
      </MapView>
    </View>
  );
}

export default MapScreen;
