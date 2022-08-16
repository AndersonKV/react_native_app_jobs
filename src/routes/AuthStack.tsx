import React from 'react';

import {JobDetail} from '../screens/JobDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Matching} from '../screens/Matchings';
import {LoginOut} from '../screens/LoginOut';
import {Edit} from '../screens/Edit';
import {Opportunity} from '../screens/Opportunity';
import {Error} from '../screens/Error';

const Stack = createNativeStackNavigator();

export function AuthStack(props: any) {
  console.log('AuthStack');

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{title: ''}}
        initialParams={{
          values: props.route.params.values,
          token: props.route.params.token,
        }}
        component={JobDetail}
        name="JobDetail"
      />

      <Stack.Screen
        initialParams={{values: props.route.params.values}}
        component={Matching}
        options={{
          headerShown: false,
        }}
        name="Matching"
      />

      <Stack.Screen
        initialParams={{values: props.route.params.values}}
        component={Edit}
        name="Edit"
        options={{title: 'Editar perfil'}}
      />

      <Stack.Screen
        initialParams={{values: props.route.params.values}}
        component={LoginOut}
        name="LoginOut"
      />
      <Stack.Screen
        options={{title: ''}}
        initialParams={{values: props.route.params.values}}
        component={Opportunity}
        name="Opportunity"
      />
      <Stack.Screen
        initialParams={{values: props.route.params.values}}
        component={Error}
        options={{
          headerShown: false,
        }}
        name="Error"
      />
    </Stack.Navigator>
  );
}
