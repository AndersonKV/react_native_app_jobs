import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {api} from '../../api/api';
import {JobContent} from '../../components/JobContent';
import {Loading} from '../../components/Loading';
import {auth, selectAuth} from '../../store/userSlice';
import {useFocusEffect} from '@react-navigation/native';
import {RoutesPath} from '../../utils/routesPath';
import {styles} from './styles';
import {ScreenOpportunity} from '../../utils/routesType/rootScreenProps';

export function Opportunity({navigation}: ScreenOpportunity) {
  const {user, token} = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      async function init() {
        try {
          const response = await api.post(RoutesPath.DASHBOARD_OPPORTUNITY, {
            Authorization: `Bearer ${token}`,
          });
          const {data} = response.data;

          dispatch(auth({user: data, token: response.data.token}));

          navigation.setOptions({
            title: user.role === 'USER' ? 'Candidaturas' : 'Vagas postadas',
          });
        } catch (err) {
          navigation.navigate('AuthStack', {
            screen: 'Error',
          });
        } finally {
          setLoading(true);
        }
      }
      init();
    }, []),
  );

  if (!loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {user.role === 'USER' ? (
        <Text style={styles.title}>
          Vagas que você se candidatou ({user.matchings.length})
        </Text>
      ) : (
        <Text style={styles.title}>Vagas que você postou</Text>
      )}

      <View style={styles.sizeHeight}>
        {user.role === 'USER' ? (
          <FlatList
            style={styles.content}
            keyExtractor={item => item.id.toString()}
            data={user.matchings}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.alignItem}
                onPress={() =>
                  navigation.navigate('AuthStack', {
                    screen: 'JobDetail',
                    values: item.job_posted,
                    token: token,
                  })
                }>
                <JobContent
                  title={item.job_posted.title}
                  benefits={item.job_posted.benefits}
                  created_at={item.job_posted.created_at}
                  experience_level={item.job_posted.experience_level}
                  expired_days={item.job_posted.expired_days}
                  id={item.job_posted.id}
                  name_company={item.job_posted.name_company}
                  remote={item.job_posted.remote}
                  requirements={item.job_posted.requirements}
                  responsibilities={item.job_posted.responsibilities}
                  salary={item.job_posted.salary}
                  size_company={item.job_posted.size_company}
                  types_contract={item.job_posted.types_contract}
                  updated_at={item.job_posted.updated_at}
                  user_id={item.job_posted.id_user}
                />
              </TouchableOpacity>
            )}
          />
        ) : user.role === 'COMPANY' ? (
          <FlatList
            style={styles.content}
            keyExtractor={item => item.id.toString()}
            data={user.posts}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.alignItem}
                onPress={() =>
                  navigation.navigate('AuthStack', {
                    screen: 'JobDetail',
                    values: item,
                  })
                }>
                <Text style={styles.title}>
                  Aplicações ({item.matchings.length})
                </Text>
                <JobContent
                  title={item.title}
                  expired={item.expired}
                  benefits={item.benefits}
                  created_at={item.created_at}
                  experience_level={item.experience_level}
                  expired_days={item.expired_days}
                  id={item.id}
                  name_company={item.name_company}
                  remote={item.remote}
                  requirements={item.requirements}
                  responsibilities={item.responsibilities}
                  salary={item.salary}
                  size_company={item.size_company}
                  types_contract={item.types_contract}
                  updated_at={item.updated_at}
                  user_id={item.id_user}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <View>
            {navigation.navigate('AuthStack', {
              screen: 'Error',
            })}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
