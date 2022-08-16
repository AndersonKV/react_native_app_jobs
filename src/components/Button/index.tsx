import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

interface ButtonProps {
  background: string;
  color: string;
  title: string;
  border?: string;
  navigate?: any;
}
export function CustomButton({
  background,
  color,
  title,
  navigate,
  ...rest
}: ButtonProps) {
  return (
    <TouchableWithoutFeedback onPress={navigate} {...rest}>
      <View style={[styles.button, {backgroundColor: background}]}>
        <Text style={[styles.text, {color: color}]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderColor: 'none',
  },
  text: {fontWeight: 'bold'},
});
