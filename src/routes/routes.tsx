import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {auth, selectAuth} from '../store/userSlice';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStack} from './HomeStack';
import {AuthTabStack} from './AuthTabStack';
import {AuthStack} from './AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../components/Loading';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const {user} = useSelector(selectAuth);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function init() {
      console.log('useEffect - CHEGAMOS NO ROUTES ');

      try {
        const getStorage = await AsyncStorage.getItem('@mobilinho:authToken');

        const getAuth = getStorage ? JSON.parse(String(getStorage)) : [];

        if (Object.values(getAuth).length) {
          dispatch(auth({user: getAuth.data[0], token: getAuth.token}));
        } else {
          await AsyncStorage.clear();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(true);
      }
    }

    init();
  }, []);

  if (!loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user.id ? 'AuthTabStack' : 'HomeStack'}>
        <Stack.Screen
          name="HomeStack"
          options={{headerShown: false}}
          component={HomeStack}
        />
        <Stack.Screen
          name="AuthTabStack"
          options={{headerShown: false}}
          component={AuthTabStack}
        />
        <Stack.Screen
          name="AuthStack"
          options={{headerShown: false}}
          component={AuthStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
