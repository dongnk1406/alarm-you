import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {Q} from '@nozbe/watermelondb';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import reactotron from 'reactotron-react-native';
import Metrics from 'src/assets/metrics';
import database from 'src/database/database';
import {SkillsModel} from 'src/database/models';
import {useAppTheme} from 'src/hooks';
import {useAppDispatch} from 'src/redux/hooks';
import {setSignOut, setUserToken} from 'src/redux/slices';
import permission from 'src/utils/permission';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation('translation');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const theme = useAppTheme();

  const [text, setText] = useState<string | undefined>('');
  const [type, setType] = useState<string>('soft');
  const [listSkill, setListSkill] = useState<SkillsModel[]>([]);
  const [currentSkill, setCurrentSkill] = useState<SkillsModel | undefined>();

  const dispatch = useAppDispatch();

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
    fetchData();
  };

  const handleRemoveSkill = async (skill: SkillsModel) => {
    await database.write(async () => {
      await skill.markAsDeleted();
    });

    fetchData();
  };

  const fetchData = async () => {
    const skillsCollection = database.get<SkillsModel>('skills');
    const response = await skillsCollection
      .query(Q.where('type', type))
      .fetch();
    setListSkill(response);
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  const onChangeToken = () => {
    const token = uuid.v4().toString();
    dispatch(setUserToken(token));
  };

  const handleSignOut = () => {
    dispatch(setSignOut(null));
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
              fetchData();
            }}
          />
        }>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
          }}
          onPress={onChangeToken}>
          <Text>Change token</Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
          }}
          onPress={handleSignOut}>
          <Text>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity
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
        </TouchableOpacity>
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
              padding: 8,
              flex: 1,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'pink',
              padding: 8,
              borderRadius: 4,
              marginLeft: 8,
            }}
            onPress={handleSaveSkill}>
            <Text>{currentSkill?.id ? 'Update' : 'Create'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginTop: 12}}>
          <TouchableOpacity
            style={{
              backgroundColor: type === 'soft' ? 'orange' : 'pink',
              padding: 8,
              borderRadius: 4,
            }}
            onPress={() => setType('soft')}>
            <Text>Soft</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: type === 'tech' ? 'orange' : 'pink',
              padding: 8,
              borderRadius: 4,
              marginLeft: 8,
            }}
            onPress={() => setType('tech')}>
            <Text>Technical</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 12}}>
          {listSkill.map(skill => (
            <TouchableOpacity
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
                <TouchableOpacity
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
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginLeft: 8,
                    backgroundColor: 'orange',
                    padding: 4,
                    borderRadius: 4,
                  }}
                  onPress={() => handleRemoveSkill(skill)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['70%']}
        onChange={() => {}}
        detached
        bottomInset={(Metrics.screenHeight * 0.3) / 2}
        style={{marginHorizontal: 20}}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.8}
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
