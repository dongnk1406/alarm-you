import withObservables from '@nozbe/with-observables';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import database from 'src/database/database';
import {SkillsModel} from 'src/database/models';
import {AllStackParamList} from 'src/navigation/types';

type Props = NativeStackScreenProps<AllStackParamList, 'MapScreen'> & {
  skills: SkillsModel[];
};
const ChatScreen = ({navigation, skills}: Props) => {
  const {t} = useTranslation('translation');
  const [text, setText] = useState<string | undefined>('');

  const handleSaveSkill = async () => {
    await database.write(async () => {
      await database.get<SkillsModel>('skills').create(skill => {
        skill.name = text;
        skill.type = 'soft';
      });
    });

    setText('');
  };

  const handleSignOut = () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 12,
          paddingHorizontal: 16,
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
          <Text>Create</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={skills || []}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 60,
        }}
        renderItem={({item}) => {
          return (
            <View
              style={{
                marginTop: 12,
                borderRadius: 8,
                padding: 8,
                backgroundColor: 'pink',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const enhance = withObservables(['skills'], () => ({
  skills: database.get<SkillsModel>('skills').query().observe(),
}));

export default enhance(ChatScreen);
