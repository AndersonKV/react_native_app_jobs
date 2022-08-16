import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../screens/Home';

import {RegisterUser} from '../screens/SignIn/Users/RegisterUser';
import {LoginUser} from '../screens/SignIn/Users/LoginUser';
import {LoginCompany} from '../screens/SignIn/Companies/LoginCompany';
import {RegisterCompany} from '../screens/SignIn/Companies/RegisterCompany';

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />

      <Stack.Screen
        options={{title: 'Entrar como usuário'}}
        name="LoginUser"
        component={LoginUser}
      />
      <Stack.Screen
        options={{title: 'Cadastrar-se como usuário'}}
        name="RegisterUser"
        component={RegisterUser}
      />
      <Stack.Screen
        options={{title: 'Entrar como compania'}}
        name="LoginCompany"
        component={LoginCompany}
      />
      <Stack.Screen
        options={{title: 'Cadastrar-se como compania'}}
        name="RegisterCompany"
        component={RegisterCompany}
      />
    </Stack.Navigator>
  );
}
