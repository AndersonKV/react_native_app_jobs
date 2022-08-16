import React, {useEffect} from 'react';
import backgroud from '../../assets/image/background.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {View, Text, Button, ImageBackground} from 'react-native';

import {theme} from '../../theme';
import {ScreenHome} from '../../utils/routesType/rootScreenProps';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/userSlice';
import {styles} from './styles';

export function Home(props: ScreenHome) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function init() {
      await AsyncStorage.clear();
      dispatch(logout());
    }

    init();
  }, []);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={backgroud}
        resizeMode="cover"
        style={styles.contentBackground}>
        <View style={styles.contentButtons}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#000'}}>
            Opa novo por aqui :)
          </Text>
          <View style={{marginVertical: 20}}>
            <Button
              title="Entrar como candidato"
              onPress={() => props.navigation.navigate('LoginUser')}
            />
          </View>
          <Button
            title="Entrar como empresa"
            color={theme.colors.backgroundRegister}
            onPress={() => props.navigation.navigate('LoginCompany')}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
