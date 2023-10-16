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
import uuid from 'react-native-uuid';
import {StyledText} from 'src/components/base';
import {NavigationController} from 'src/navigation';
import {useAppDispatch} from 'src/redux/hooks';
import {GlobalUIService} from 'src/services/globalUI';
import * as yup from 'yup';

type IFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
};
const SignUpScreen = () => {
  const dispatch = useAppDispatch();

  const signInSchema = yup
    .object({
      email: yup.string().required().email('can email'),
      password: yup.string().required().max(10),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), ''], 'Need to match'),
      avatar: yup.string().required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    watch,
    reset,
    resetField,
    setValue,
    getValues,
    clearErrors,
  } = useForm<IFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (form: IFormData) => {
    const payload = {
      ...form,
      id: uuid.v4().toString(),
    };

    try {
      GlobalUIService.showLoading();
      await database().ref(`/users/${payload.id}`).set(payload);
      GlobalUIService.hideLoading();
      NavigationController.navigate('SignInScreen');
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
          Register screen
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

        <Text style={{color: 'black'}}>Confirm Password</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="confirmPassword"
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
        {errors.confirmPassword && (
          <Text style={{color: 'red'}}>{errors.confirmPassword.message}</Text>
        )}

        <Text style={{color: 'black'}}>Avatar</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="avatar"
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
        {errors.avatar && (
          <Text style={{color: 'red'}}>{errors.avatar.message}</Text>
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
          onPress={handleSubmit(onSubmit)}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
