import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

interface Props {
  name: string;
  number: number;
  navigate: () => void;
}

export function Card({name, number, navigate}: Props) {
  return (
    <TouchableOpacity onPress={navigate} style={styles.touchaButton}>
      <Text style={styles.spanNumeric}>{number}</Text>
      <Text style={styles.spanName}>{name}</Text>
      <Text style={styles.spanMiniText}>Ver</Text>
    </TouchableOpacity>
  );
}
