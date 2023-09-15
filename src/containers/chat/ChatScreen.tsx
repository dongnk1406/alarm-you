import database from '@react-native-firebase/database';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {s} from 'react-native-size-matters';
import {StyledText, StyledTouchable, StyledView} from 'src/components/base';
import {AppImage, AppRefreshControl} from 'src/components/common';
import {AllStackParamList} from 'src/navigation/config/types';
import {GlobalUIService} from 'src/services/globalUI';

type Props = NativeStackScreenProps<AllStackParamList, 'ChatScreen'> & {};
const ChatScreen = ({navigation}: Props) => {
  const [listUsers, setListUsers] = useState([]);

  const fetchListUsers = async () => {
    try {
      GlobalUIService.showLoading();
      const response = await database().ref('/users/').once('value');
      setListUsers(Object.values(response.val()));
    } catch (error) {
      console.log(error);
    } finally {
      GlobalUIService.hideLoading();
    }
  };

  useEffect(() => {
    fetchListUsers();
  }, []);

  return (
    <FlatList
      refreshControl={
        <AppRefreshControl refreshing={false} onRefresh={fetchListUsers} />
      }
      data={listUsers}
      keyExtractor={user => String(user?.id)}
      renderItem={({item: user}) => {
        return (
          <StyledTouchable
            activeOpacity={1}
            underlayColor={'#ccc'}
            style={{
              flexDirection: 'row',
              marginTop: s(16),
              alignItems: 'center',
              paddingHorizontal: 16,
            }}>
            <AppImage
              source={{uri: user?.avatar}}
              style={{width: 50, height: 50, borderRadius: 50}}
            />
            <StyledText color="neutral-black" marginLeft={'l'}>
              {user?.email}
            </StyledText>
          </StyledTouchable>
        );
      }}
    />
  );
};

export default ChatScreen;
