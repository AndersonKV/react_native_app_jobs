/**
 * @format
 */

import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import {Home} from '../src/pages/Home';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import {Avatar} from '../src/components/Avatar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBriefcase} from '@fortawesome/free-solid-svg-icons';
const Tab = createBottomTabNavigator();

test('page contains the header and 10 items', async () => {
  // const Component = (
  //   <NavigationContainer>
  //     <Tab.Navigator>
  //       <Tab.Screen
  //         options={{
  //           tabBarLabelStyle: {
  //             fontSize: 15,
  //             fontWeight: 'bold',
  //           },
  //           tabBarIcon: ({focused, color, size}) => {
  //             return <FontAwesomeIcon icon={faBriefcase} size={20} />;
  //           },

  //           headerBackground: () => (
  //             <View
  //               style={{
  //                 alignSelf: 'flex-end',
  //                 marginHorizontal: 20,
  //               }}>
  //               <Avatar
  //                 image={
  //                   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3wi5Fnlm-jnEkE1-wg-G00fdPZfgAAHcXaZ4Tt6IbaDFy3ngwb1334LkhSUbnciiRy1w&usqp=CAU'
  //                 }
  //                 width={50}
  //                 height={'100%'}
  //               />
  //             </View>
  //           ),
  //         }}
  //         name="Jobs"
  //         component={Home}
  //       />
  //     </Tab.Navigator>
  //   </NavigationContainer>
  // );

  const {getByTestId, getByText, queryByTestId, toJSON} = render(
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
          tabBarIcon: ({focused, color, size}) => {
            return <FontAwesomeIcon icon={faBriefcase} size={20} />;
          },

          headerBackground: () => (
            <View
              style={{
                alignSelf: 'flex-end',
                marginHorizontal: 20,
              }}>
              <Avatar
                image={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3wi5Fnlm-jnEkE1-wg-G00fdPZfgAAHcXaZ4Tt6IbaDFy3ngwb1334LkhSUbnciiRy1w&usqp=CAU'
                }
                width={50}
                height={'100%'}
              />
            </View>
          ),
        }}
        name="Jobs"
        component={Home}
      />
    </Tab.Navigator>,
  );

  const header = getByText('Opa novo por aqui');

  expect(header).toBeTruthy();
});
