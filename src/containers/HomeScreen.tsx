import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import {ChatScreen} from 'src/containers';
import {ELanguage} from 'src/shared/interfaces';
import {changeLanguage} from 'src/utils/i18next';
import Toast from 'react-native-toast-message';

function Home() {
  const navigation = useNavigation();
  const {t} = useTranslation('translation');

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{backgroundColor: 'orange', padding: 8, borderRadius: 4}}
        onPress={() => navigation.navigate('Map')}>
        <Text>{t('common.map')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeLanguage(ELanguage.VIETNAM);
          Toast.show({
            type: 'success',
            text1: 'Hello VIETNAM',
            text2: 'This is some something 👋',
          });
        }}
        style={{
          backgroundColor: 'orange',
          padding: 8,
          borderRadius: 4,
          marginTop: 12,
        }}>
        <Text>Change language to VN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeLanguage(ELanguage.ENGLISH);
          Toast.show({
            type: 'success',
            text1: 'Hello ENGLISH',
            text2: 'This is some something 👋',
          });
        }}
        style={{
          backgroundColor: 'orange',
          padding: 8,
          borderRadius: 4,
          marginTop: 12,
        }}>
        <Text>Change language EN</Text>
      </TouchableOpacity>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}
