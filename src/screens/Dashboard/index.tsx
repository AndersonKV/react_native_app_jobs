import React from 'react';
import {
  View,
  Dimensions,
  Button,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {Avatar} from '../../components/Avatar';
import {useDispatch, useSelector} from 'react-redux';
import {auth, selectAuth} from '../../store/userSlice';
import {RoutesPath} from '../../utils/routesPath';
import {api} from '../../api/api';
import {useFocusEffect} from '@react-navigation/native';
import {Card} from '../../components/Card';
import {styles} from './styles';
import {ScreenDashboard} from '../../utils/routesType/rootScreenProps';

export function Dashboard({navigation}: ScreenDashboard) {
  const {user, token} = useSelector(selectAuth);
  const windowHeight = Dimensions.get('window').height;

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      async function init() {
        console.log('DASHBOARD');
        try {
          const response = await api.post(RoutesPath.DASHBOARD, {
            Authorization: `Bearer ${token}`,
          });

          dispatch(
            auth({user: response.data.data, token: response.data.token}),
          );
        } catch (err) {
          console.log('err.response.data');
          navigation.navigate('AuthStack', {screen: 'Error'});
        }
      }
      init();
    }, []),
  );

  const navigateEdit = () => {
    navigation.navigate('AuthStack', {
      screen: 'Edit',
      values: user,
    });
  };

  const navigateOpportunity = () => {
    navigation.navigate('AuthStack', {
      screen: 'Opportunity',
    });
  };

  return (
    <SafeAreaView style={[styles.areaView, {height: windowHeight}]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentAvatar}>
          <Text style={styles.text}>{user.name}</Text>

          <View style={styles.marginAvatar}>
            <Avatar image={user.avatar} width={150} height={150} border={80} />
          </View>

          <Button title="Editar meu perfil" onPress={navigateEdit} />
        </View>

        {user.role === 'USER' ? (
          <View style={styles.viewCard}>
            <Card
              name={'Candidaturas'}
              number={user?._count?.matchings}
              navigate={navigateOpportunity}
            />
          </View>
        ) : (
          <View style={styles.viewCard}>
            <Card
              name={'Matchings'}
              number={user?._count?.posts}
              navigate={navigateOpportunity}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
