import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {AppStacks} from './AppStacks';
import {GuestStacks} from './GuestStacks';
import database from 'src/database/database';
import {UserModel} from 'src/database/models';

export const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const [token, setToken] = useState<string | undefined>();
  const fetchData = async () => {
    const userCollection = database.get<UserModel>('user');
    const response = await userCollection.query().fetch();
    const token = response[0].token;
    setToken(token);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SignInScreen">
      {true ? AppStacks() : GuestStacks()}
    </Stack.Navigator>
  );
};
