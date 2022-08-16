import React from 'react';

import {Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectAuth} from '../../store/userSlice';
import {PropsModal} from '../../utils/routesType/rootScreenProps';
import {styles} from './styles';

interface Props {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  navigation: PropsModal;
}

export function ModalScreen({
  modalVisible,
  setModalVisible,
  navigation,
}: Props) {
  const {user} = useSelector(selectAuth);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        console.log('modal');
      }}>
      <Pressable
        style={styles.centeredView}
        onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('AuthTabStack', {
                screen: 'ListJobs',
              });
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.modalText}>Ver vagas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('AuthTabStack', {
                screen: 'Dashboard',
              });
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.modalText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('AuthStack', {
                screen: 'Edit',
                values: user,
              });
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.modalText}>Editar meu perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('AuthStack', {
                screen: 'LoginOut',
              });
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.modalText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}
