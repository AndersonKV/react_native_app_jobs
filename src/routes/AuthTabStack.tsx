import React, {useState} from 'react';

import {Avatar} from '../components/Avatar';
import {ListJobs} from '../screens/ListJobs';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  faUser,
  faBriefcase,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Dashboard} from '../screens/Dashboard';

import {useSelector} from 'react-redux';
import {selectAuth} from '../store/userSlice';

import {ModalScreen} from '../components/Modal';
import {theme} from '../theme';
import {Publish} from '../screens/Publish';

const Tab = createBottomTabNavigator();

export function AuthTabStack() {
  const {user} = useSelector(selectAuth);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={({navigation}) => ({
          title: 'Lista de vagas',
          headerTintColor: '#0000',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
          // tabBarLabel({focused}) {
          //   return (
          //     <Text
          //       style={{
          //         color: focused ? '#000' : theme.colors.gray,
          //         fontSize: theme.labels.bottomFontSize,
          //       }}>
          //       Lista de vagas
          //     </Text>
          //   );
          // },
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesomeIcon
                icon={faBriefcase}
                size={20}
                color={focused ? theme.colors.activeTab : theme.colors.gray}
              />
            );
          },

          headerBackground: () => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={styles.backgroundHeader}>
              <View style={styles.alignSelftFlexEnd}>
                <Avatar
                  image={user.avatar}
                  width={50}
                  height={50}
                  border={60}
                />
              </View>
              <ModalScreen
                navigation={navigation}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
              />
            </TouchableOpacity>
          ),
        })}
        name="ListJobs"
        component={ListJobs}
      />
      {user.role === 'COMPANY' ? (
        <Tab.Screen
          options={({navigation}) => ({
            tabBarLabelStyle: {
              fontSize: 15,
              fontWeight: 'bold',
            },
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesomeIcon
                  icon={faCircleArrowUp}
                  size={20}
                  color={focused ? theme.colors.activeTab : theme.colors.gray}
                />
              );
            },

            headerBackground: () => (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.backgroundHeader}>
                <View style={styles.alignSelftFlexEnd}>
                  <Avatar
                    image={user.avatar}
                    width={50}
                    height={50}
                    border={60}
                  />
                </View>
                <ModalScreen
                  navigation={navigation}
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible}
                />
              </TouchableOpacity>
            ),
          })}
          name="Publicar"
          component={Publish}
        />
      ) : null}

      <Tab.Screen
        options={({navigation}) => ({
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },

          tabBarIcon: ({focused}) => {
            return (
              <FontAwesomeIcon
                icon={faUser}
                size={20}
                color={focused ? theme.colors.activeTab : theme.colors.gray}
              />
            );
          },
          headerBackground: () => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={styles.backgroundHeader}>
              <View style={styles.alignSelftFlexEnd}>
                <Avatar
                  image={user.avatar}
                  width={50}
                  height={50}
                  border={60}
                />
              </View>
              <ModalScreen
                navigation={navigation}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
              />
            </TouchableOpacity>
          ),
        })}
        name="Dashboard"
        component={Dashboard}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  backgroundHeader: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    width: '100%',
    opacity: 5,
    backgroundColor: '#fff',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alignSelftFlexEnd: {
    alignSelf: 'flex-end',
    margin: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontWeight: '300',
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
  },
});
