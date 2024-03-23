import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s} from 'react-native-size-matters';
import {StyledText, StyledTouchable, StyledView} from 'src/components/base';
import {AppImage, AppRefreshControl} from 'src/components/common';
import {NavigationController} from 'src/navigation';
import {useAppSelector} from 'src/redux/hooks';
import {GlobalUIService} from 'src/services/globalUI';
import {AppStyles} from 'src/theme';

const ChatScreen = () => {
  const userData = useAppSelector(state => state.auth.user);

  const [listChatUsers, setListChatUsers] = useState([]);

  const fetchListChats = async () => {
    try {
      GlobalUIService.showLoading();

      database()
        .ref(`/chatlist/${userData?.id}`)
        .on('value', snapshot => {
          setListChatUsers(Object.values(snapshot.val()));
        });
    } catch (error) {
      console.log(error);
    } finally {
      GlobalUIService.hideLoading();
    }
  };

  useEffect(() => {
    fetchListChats();
  }, []);

  return (
    <SafeAreaView style={[AppStyles.container]}>
      <FlatList
        refreshControl={
          <AppRefreshControl refreshing={false} onRefresh={fetchListChats} />
        }
        data={listChatUsers}
        keyExtractor={user => String(user?.id)}
        contentContainerStyle={{
          paddingHorizontal: s(16),
        }}
        ListHeaderComponent={
          <StyledTouchable
            onPress={() =>
              NavigationController.navigate('SearchChatUserScreen')
            }
          >
            <StyledText color={'neutral-black'} textAlign="right">
              Create
            </StyledText>
          </StyledTouchable>
        }
        renderItem={({item: user}) => {
          return (
            <StyledTouchable
              activeOpacity={1}
              underlayColor={'#ccc'}
              style={{
                flexDirection: 'row',
                marginTop: s(16),
                alignItems: 'center',
              }}
              onPress={() => NavigationController.navigate('SingleChatScreen')}
            >
              <AppImage
                source={{uri: user?.avatar}}
                style={{width: 50, height: 50, borderRadius: 50}}
              />
              <StyledView marginLeft={'l'}>
                <StyledText color="neutral-black">{user?.email}</StyledText>
                {user?.lastMessage && (
                  <StyledText color="gray-text" marginTop="s">
                    {user?.lastMessage}
                  </StyledText>
                )}
              </StyledView>
            </StyledTouchable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
