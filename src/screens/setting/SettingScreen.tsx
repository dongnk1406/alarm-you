import withObservables from '@nozbe/with-observables';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StyledView} from 'src/components/base';
import database from 'src/database/database';
import {SkillsModel} from 'src/database/models';
import {useAppTheme} from 'src/hooks';
import {AllStackParamList} from 'src/navigation/config/types';

type Props = NativeStackScreenProps<AllStackParamList, 'SettingScreen'> & {
  skills: SkillsModel[];
};
const SettingScreen = ({navigation, skills}: Props) => {
  const {t} = useTranslation('translation');
  const [text, setText] = useState<string | undefined>('');
  const {colors} = useAppTheme();

  const handleSaveSkill = async () => {
    await database.write(async () => {
      await database.get<SkillsModel>('skills').create(skill => {
        skill.name = text;
        skill.type = 'soft';
      });
    });

    setText('');
  };

  return (
    <StyledView
      style={{flex: 1}}
      paddingTop={'4xl'}
      backgroundColor={'mainBackground'}>
      <StyledView
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
      </StyledView>
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
    </StyledView>
  );
};

const enhance = withObservables(['skills'], () => ({
  skills: database.get<SkillsModel>('skills').query().observe(),
}));

export default enhance(SettingScreen);
