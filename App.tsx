import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar, View} from 'react-native';

import 'react-native-gesture-handler';

import Routes from './src/routes/routes';
import {Provider} from 'react-redux';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Routes />
      </View>
    </Provider>
  );
}
