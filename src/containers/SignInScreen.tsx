import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import reactotron from 'reactotron-react-native';
import database from 'src/database/database';
import {UsersModel} from 'src/database/models';
import {navigationRef} from 'src/providers/AppProvider';

const SignInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const handleSubmit = async () => {
  //   const usersCollection = database.get<UsersModel>('users');
  //   try {
  //     await usersCollection.find(email);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Registered',
  //     });
  //   } catch (error) {
  //     await database.write(async () => {
  //       await usersCollection.create(user => {
  //         user.email = email;
  //         user.password = password;
  //         user.token = uuid.v4().toString();
  //       });
  //     });
  //     Toast.show({
  //       type: 'success',
  //       text1: 'Successfully',
  //     });
  //   }
  // };

  const handleSubmit = async () => {
    const user = await UsersModel.login(email, password);
    reactotron.log('users', user);
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
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
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

export default SignInScreen;
