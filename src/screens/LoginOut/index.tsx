import React, {useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../../components/Loading';
import {ScreenSignOut} from '../../utils/routesType/rootScreenProps';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/userSlice';

export function LoginOut(props: ScreenSignOut) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function init() {
      await AsyncStorage.clear();
      dispatch(logout());
      props.navigation.reset({index: 0, routes: [{name: 'HomeStack'}]});
    }

    init();
  }, []);

  return <Loading />;
}
