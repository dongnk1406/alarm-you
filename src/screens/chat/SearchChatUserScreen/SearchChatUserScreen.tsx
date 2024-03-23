import database from '@react-native-firebase/database';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {s} from 'react-native-size-matters';
import uuid from 'react-native-uuid';
import {StyledText, StyledTouchable} from 'src/components/base';
import {AppImage, AppRefreshControl} from 'src/components/common';
import {NavigationController} from 'src/navigation';
import {AllStackParamList} from 'src/navigation/configs/types';
import {useAppSelector} from 'src/redux/hooks';
import {GlobalUIService} from 'src/services/globalUI';

type Props = NativeStackScreenProps<
  AllStackParamList,
  'SearchChatUserScreen'
> & {};
const SearchChatUserScreen = ({navigation}: Props) => {
  const [listUsers, setListUsers] = useState([]);
  const userData = useAppSelector(state => state.auth.user);

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

  const handleCreateChatList = async pvpUser => {
    const roomId = uuid.v4().toString();
    const _userData = {
      ...userData,
      roomId,
      lastMessage: '',
    };
    delete _userData?.password;
    delete _userData?.confirmPassword;

    const _pvpUser = {
      ...pvpUser,
      lastMessage: '',
      roomId,
    };
    delete _pvpUser?.password;
    delete _pvpUser?.confirmPassword;

    const promise1 = database()
      .ref(`/chatlist/${pvpUser?.id}/${userData?.id}`)
      .update(_userData);

    const promise2 = database()
      .ref(`/chatlist/${userData?.id}/${pvpUser?.id}`)
      .update(_pvpUser);

    try {
      GlobalUIService.showLoading();
      await Promise.all([promise1, promise2]);
      NavigationController.navigate('SingleChatScreen');
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
            }}
            onPress={() => handleCreateChatList(user)}
          >
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

export default SearchChatUserScreen;
