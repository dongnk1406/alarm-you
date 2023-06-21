import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import database from 'src/database/database';
import {UserModel} from 'src/database/models';

export const SignInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const handleSubmit = async () => {
    await database.write(async () => {
      await database.get<UserModel>('user').create(user => {
        user.email = email;
        user.token = token;
      });
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: 'gray',
            padding: 8,
          }}
        />
        <Text>Token</Text>
        <TextInput
          value={token}
          onChangeText={setToken}
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: 'gray',
            padding: 8,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
