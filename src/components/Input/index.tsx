import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {ChangeEvent, useState} from 'react';
import {KeyboardTypeOptions, TextInput, View} from 'react-native';
import {styles} from './styles';

interface Props {
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  icon?: IconProp;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  handleChange: (e: string | ChangeEvent<any>) => void;
}
export function InputCompomnent({
  keyboardType,
  icon,
  handleChange,
  placeholder,
  value,
  secureTextEntry,
  multiline = false,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  const colorFocus = isFocused ? '#007bff' : '#FFFFFF';
  const colorBoxFocus = isFocused ? '#fff' : '#AEAEB3';
  const colorInputFocus = isFocused ? '#007bff' : '#d3d3d3';

  return (
    <View style={isFocused || isFilled ? styles.contentFocus : styles.content}>
      {icon ? (
        <View
          style={[
            styles.boxIcon,
            {backgroundColor: colorFocus, borderColor: colorFocus},
          ]}>
          <FontAwesomeIcon
            icon={icon}
            size={20}
            style={styles.icon}
            color={colorBoxFocus}
          />
        </View>
      ) : null}

      <TextInput
        onChangeText={handleChange}
        onBlur={handleInputBlur}
        value={value}
        placeholder={placeholder}
        style={[
          multiline ? styles.inputMultLine : styles.input,
          {borderColor: colorInputFocus},
        ]}
        keyboardType={keyboardType}
        onFocus={handleInputFocus}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
    </View>
  );
}
