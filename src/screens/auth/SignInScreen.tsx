import {yupResolver} from '@hookform/resolvers/yup';
import database from '@react-native-firebase/database';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StyledText, StyledTouchable} from 'src/components/base';
import {NavigationController} from 'src/navigation';
import {getSignInRequest} from 'src/redux/auth';
import {useAppDispatch} from 'src/redux/hooks';
import {GlobalUIService} from 'src/services/globalUI';
import * as yup from 'yup';

type IFormData = {
  email: string;
  password: string;
};
const SignInScreen = () => {
  const dispatch = useAppDispatch();

  const signInSchema = yup
    .object({
      email: yup.string().required().email('can email'),
      password: yup.string().required().max(10),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (form: IFormData) => {
    try {
      GlobalUIService.showLoading();
      const response = await database()
        .ref('/users/')
        .orderByChild('email')
        .equalTo(form.email)
        .once('value');

      if (response) {
        const userData = Object.values(response.val())[0];
        dispatch(getSignInRequest(userData));
      }
    } catch (error) {
      console.log(error);
    } finally {
      GlobalUIService.hideLoading();
    }
  };

  const onError = () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <StyledText color={'neutral-black'} textAlign="center" variant={'body'}>
          Sign In screen
        </StyledText>
        <Text style={{color: 'black'}}>Email</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="email"
          render={({field: {value, onChange, onBlur}}) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: 'gray',
                padding: 8,
                color: 'black',
              }}
            />
          )}
        />
        {errors.email && (
          <Text style={{color: 'red'}}>{errors.email.message}</Text>
        )}

        <Text style={{color: 'black'}}>Password</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="password"
          render={({field: {value, onChange, onBlur}}) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: 'gray',
                padding: 8,
                color: 'black',
              }}
              placeholderTextColor={'grey'}
            />
          )}
        />
        {errors.password && (
          <Text style={{color: 'red'}}>{errors.password.message}</Text>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <StyledText color={'black'}>Sign In</StyledText>
        </TouchableOpacity>

        <StyledTouchable
          onPress={() => {
            NavigationController.navigate('SignUpScreen');
          }}
          style={{
            backgroundColor: 'orange',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <StyledText color={'neutral-black'}>Register</StyledText>
        </StyledTouchable>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
