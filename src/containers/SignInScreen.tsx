import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import {useAppDispatch} from 'src/redux/hooks';
import {setSignIn} from 'src/redux/slices';

const SignInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    const token = uuid.v4().toString();
    dispatch(setSignIn(token));
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
