import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {Q} from '@nozbe/watermelondb';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  NativeEventEmitter,
  NativeModules,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {StyledText, StyledTouchable, StyledView} from 'src/components/base';
import database from 'src/database/database';
import {SkillsModel} from 'src/database/models';
import {getSignOutRequest} from 'src/redux/auth';
import {useAppDispatch, useAppSelector} from 'src/redux/hooks';
import {appVersion} from 'src/shared/configs';
import {requestCameraPermission} from 'src/utils/permission';
const {CalendarModule} = NativeModules;
const eventEmitter = new NativeEventEmitter(CalendarModule);

const HomeScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation('translation');
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const dispatch = useAppDispatch();

  const [text, setText] = React.useState<string | undefined>('');
  const [type, setType] = React.useState<string>('soft');
  const [listSkill, setListSkill] = React.useState<SkillsModel[]>([]);
  const [currentSkill, setCurrentSkill] = React.useState<
    SkillsModel | undefined
  >();
  const listDucks = useAppSelector(state => state.home.listDucks);
  const userData = useAppSelector(state => state.auth.user);
  const [isCameraPermission, setCameraPermission] =
    React.useState<boolean>(false);

  const handleSaveSkill = async () => {
    if (currentSkill?.id) {
      await database.write(async () => {
        await currentSkill.update(data => {
          data.name = text;
          data.type = type;
        });
      });
      setCurrentSkill(undefined);
    } else {
      await database.write(async () => {
        await database.collections.get<SkillsModel>('skills').create(skill => {
          skill.name = text;
          skill.type = type;
        });
      });
    }

    setText('');
    fetchSkills();
  };

  const handleRemoveSkill = async (skill: SkillsModel) => {
    await database.write(async () => {
      await skill.markAsDeleted();
    });

    fetchSkills();
  };

  const fetchSkills = async () => {
    const skillsCollection = database.get<SkillsModel>('skills');
    const response = await skillsCollection
      .query(Q.where('type', type))
      .fetch();
    setListSkill(response);
  };

  React.useEffect(() => {
    fetchSkills();
  }, [type]);

  React.useEffect(() => {
    const calendarEventEmitter = eventEmitter.addListener(
      'EventCount',
      eventCount => {
        console.log('eventCount', eventCount);
      },
    );
    return () => {
      eventEmitter.removeAllListeners('EventCount');
    };
  }, []);

  const createCalendarPromise = async () => {
    try {
      const result = await CalendarModule.createCalendarPromise();
      console.log('createCalendarPromise', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  // const getListDucks = () => {
  //   try {
  //     const promise = dispatch(getListDucksRequest());
  //     return promise;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // React.useEffect(() => {
  //   const promise = getListDucks();
  //   return () => {
  //     promise?.abort();
  //   };
  // }, []);

  const handleSignOut = () => {
    dispatch(getSignOutRequest(null));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 60,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              fetchSkills();
            }}
          />
        }>
        <StyledText style={{color: '#a78bfa'}}>{appVersion}</StyledText>

        <StyledTouchable
          style={{
            backgroundColor: 'purple',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
          }}
          onPress={createCalendarPromise}>
          <StyledText color={'neutral-white'}>
            Create calendar promise
          </StyledText>
        </StyledTouchable>

        <StyledTouchable
          style={{
            backgroundColor: 'purple',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
          }}
          onPress={async () => {
            const hasPermission =
              await permission.requestPhotoLibraryPermission();
          }}>
          <StyledText color={'neutral-white'}>Open gallery</StyledText>
        </StyledTouchable>
        <StyledTouchable
          style={{
            backgroundColor: 'purple',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
          }}
          onPress={async () => {
            navigation.navigate('MapScreen');
          }}>
          <StyledText color={'neutral-white'}>{t('common.map')}</StyledText>
        </StyledTouchable>
        <StyledTouchable
          style={{
            backgroundColor: 'purple',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
          }}
          onPress={async () => {
            if (isCameraPermission) {
              return;
            }
            requestCameraPermission();
          }}>
          <StyledText color={'neutral-white'}>
            Request camera permission
          </StyledText>
        </StyledTouchable>
        <StyledTouchable
          style={{
            backgroundColor: 'orange',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
          }}
          onPress={handleSignOut}>
          <Text>Sign out</Text>
        </StyledTouchable>
        <StyledTouchable
          style={{
            backgroundColor: 'orange',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
          }}
          onPress={() => {
            bottomSheetModalRef.current?.present();
          }}>
          <Text>Open BottomSheet</Text>
        </StyledTouchable>

        <StyledTouchable
          activeOpacity={1}
          underlayColor={'#ccc'}
          style={{
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
            borderWidth: 1,
            borderColor: 'black',
          }}>
          <StyledText color="neutral-black">TouchableHighlight</StyledText>
        </StyledTouchable>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
          }}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              borderColor: 'gray',
              paddingHorizontal: 8,
              paddingVertical: 4,
              flex: 1,
              alignSelf: 'flex-start',
              color: 'black',
            }}
          />
          <StyledTouchable
            style={{
              backgroundColor: 'pink',
              padding: 8,
              borderRadius: 4,
              marginLeft: 8,
            }}
            onPress={handleSaveSkill}>
            <Text>{currentSkill?.id ? 'Update' : 'Create'}</Text>
          </StyledTouchable>
        </View>

        <StyledView flexDirection={'row'} marginTop={'m'}>
          <StyledTouchable
            activeScale={0.9}
            style={{
              backgroundColor: type === 'soft' ? 'orange' : 'pink',
              padding: 8,
              borderRadius: 4,
            }}
            onPress={() => setType('soft')}>
            <Text>Soft</Text>
          </StyledTouchable>
          <StyledTouchable
            activeScale={0.9}
            style={{
              backgroundColor: type === 'tech' ? 'orange' : 'pink',
              padding: 8,
              borderRadius: 4,
              marginLeft: 8,
            }}
            onPress={() => setType('tech')}>
            <StyledText>Hello</StyledText>
          </StyledTouchable>
        </StyledView>
        <View style={{marginTop: 12}}>
          {listSkill.map(skill => (
            <StyledTouchable
              key={skill.id}
              style={{
                marginTop: 12,
                borderRadius: 8,
                padding: 8,
                backgroundColor: 'pink',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{skill.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <StyledTouchable
                  style={{
                    marginLeft: 8,
                    backgroundColor: 'orange',
                    padding: 4,
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    setCurrentSkill(skill);
                    setText(skill.name);
                  }}>
                  <Text>Edit</Text>
                </StyledTouchable>
                <StyledTouchable
                  style={{
                    marginLeft: 8,
                    backgroundColor: 'orange',
                    padding: 4,
                    borderRadius: 4,
                  }}
                  onPress={() => handleRemoveSkill(skill)}>
                  <Text>Delete</Text>
                </StyledTouchable>
              </View>
            </StyledTouchable>
          ))}
        </View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['70%']}
        onChange={() => {}}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.6}
          />
        )}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default HomeScreen;
