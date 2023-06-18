import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import permission from 'src/utils/permission';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation('translation');

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          padding: 8,
          borderRadius: 4,
          marginTop: 12,
        }}
        onPress={async () => {
          const hasPermission = await permission.requestPhotoLibrary();
        }}>
        <Text>Open gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          padding: 8,
          borderRadius: 4,
          marginTop: 12,
        }}
        onPress={async () => {
          navigation.navigate('MapScreen');
        }}>
        <Text>{t('common.map')}</Text>
      </TouchableOpacity>
    </View>
  );
};
