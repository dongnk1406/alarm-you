import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  LayoutAnimation,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import {useAppDispatch} from 'src/redux/hooks';
import {setSignIn} from 'src/redux/slices';
import * as yup from 'yup';

type IFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};
const SignInScreen = () => {
  const dispatch = useAppDispatch();

  const signInSchema = yup
    .object({
      email: yup.string().required().email('can email'),
      password: yup.string().required().max(10),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), ''], 'Need to match'),
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
    const token = uuid.v4().toString();
    dispatch(setSignIn(token));
  };

  const onError = () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 16}}>
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

        <TouchableOpacity
          disabled={!isValid}
          style={{
            backgroundColor: 'orange',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: !isValid ? 0.5 : 1,
          }}
          onPress={handleSubmit(onSubmit)}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
