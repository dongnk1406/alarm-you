import {Q} from '@nozbe/watermelondb';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import reactotron from 'reactotron-react-native';
import database from 'src/database/database';
import {SkillsModel} from 'src/database/models';
import permission from 'src/utils/permission';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation('translation');
  const [text, setText] = useState<string | undefined>('');
  const [type, setType] = useState<string>('soft');
  const [listSkill, setListSkill] = useState<SkillsModel[]>([]);
  const [currentSkill, setCurrentSkill] = useState<SkillsModel | undefined>();

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
        await database.get<SkillsModel>('skills').create(skill => {
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

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  useEffect(() => {
    fetchData();
  }, [type]);

  const handleSignOut = () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}>
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
    </SafeAreaView>
  );
};
