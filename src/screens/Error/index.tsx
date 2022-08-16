import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScreenError} from '../../utils/routesType/rootScreenProps';
import {styles} from './styles';

export function Error({navigation}: ScreenError) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parece que tivemos um probleminha :(</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AuthTabStack', {
            screen: 'ListJobs',
          });
        }}
        style={styles.button}>
        <Text style={styles.label}>Ver todas as vaga</Text>
      </TouchableOpacity>
    </View>
  );
}
