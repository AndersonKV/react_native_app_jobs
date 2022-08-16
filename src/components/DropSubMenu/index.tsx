import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface Props {
  title: string;
  subTitltes: Array<String>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}

export function SubDropDown({title, subTitltes, handleChange}: Props) {
  const [hide, setHide] = useState(false);
  const [active, setActive] = useState<number>();

  return (
    <View>
      <Text onPress={() => setHide(!hide)} style={styles.inputText}>
        {title}
      </Text>

      {hide ? (
        <View style={styles.content}>
          {subTitltes.map((subTitle, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleChange(active === index ? '' : subTitle.toString());
                  setActive(active === index ? undefined : index);
                }}
                key={index.toString()}
                style={[
                  styles.button,
                  active === index
                    ? styles.activeButton
                    : styles.desactiveButton,
                ]}>
                <Text
                  style={[
                    active === index ? styles.activeText : styles.desactiveText,
                  ]}>
                  {subTitle}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
