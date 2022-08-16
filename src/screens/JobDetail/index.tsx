import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';

import {JobContent} from '../../components/JobContent';
import {selectAuth} from '../../store/userSlice';
import {useSelector} from 'react-redux';
import {RoutesPath} from '../../utils/routesPath';
import {useFocusEffect} from '@react-navigation/native';
import {Loading} from '../../components/Loading';
import {ScreenJobDetail} from '../../utils/routesType/rootScreenProps';
import {JobInterface} from '../../utils/types';
import {api} from '../../api/api';
import {styles} from './styles';

export function JobDetail({navigation, route}: ScreenJobDetail) {
  const {user, token} = useSelector(selectAuth);

  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<JobInterface>();

  useFocusEffect(
    React.useCallback(() => {
      async function init() {
        const params = route.params as any;
        const values = params.values as JobInterface;

        try {
          if (values) {
            const response = await api.post(RoutesPath.AUTH_FIND_JOB_BY_ID, {
              id_job: values.id,
              Authorization: `Bearer ${token}`,
            });

            navigation.setOptions({title: response.data.job[0].title});
            setJob(response.data.job[0]);
          } else {
            // navigation.navigate('AuthStack', {
            //   screen: 'Error',
            // });
          }
        } catch (err) {
          console.log(err);
          // navigation.navigate('AuthStack', {
          //   screen: 'Error',
          // });
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
      <ScrollView>
        <View style={styles.insideBackground}>
          <View style={{width: '100%'}}>
            <Text style={styles.title}>{job?.title}</Text>
          </View>
          <View style={[styles.contentListTech]}>
            {job?.techs.map((tech, index) => {
              return (
                <Text key={index.toString()} style={styles.tech}>
                  {tech}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={styles.content}>
          <JobContent
            key={job?.id}
            width={'100%'}
            title={job?.title.toString()}
            benefits={job?.benefits}
            created_at={job?.created_at}
            experience_level={job?.experience_level}
            expired_days={job?.expired_days}
            id={job?.id}
            name_company={job?.name_company}
            remote={job?.remote}
            requirements={job?.requirements}
            responsibilities={job?.responsibilities}
            salary={job?.salary}
            size_company={job?.size_company}
            types_contract={job?.types_contract}
            user_id={job?.id_user}
            avatar={{
              height: 200,
              source: job?.avatar as ImageSourcePropType,
              width: '100%',
            }}
          />

          <View style={{marginVertical: 10}}>
            <Text style={styles.subTitle}>Atividades e Responsabilidades</Text>
            <Text>{job?.responsibilities} </Text>
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={styles.subTitle}>Requisitos</Text>
            <Text>{job?.requirements}</Text>
          </View>

          {user.role === 'USER' ? (
            !job?.expired ? (
              job?.auth_apply ? (
                <Button title="Você aplicou para essa vaga" color={'#00BFFF'} />
              ) : (
                <Button
                  title="Quero me candidatar"
                  color={'#32B796'}
                  onPress={() => {
                    navigation.navigate('Matching', {
                      values: {
                        id_job: Number(job?.id),
                        token: token,
                      },
                    });
                  }}
                />
              )
            ) : (
              <View style={styles.viewExpired}>
                <Text style={styles.spanExpired}>VENCIDO</Text>
              </View>
            )
          ) : job?.id_user === user.id ? (
            <View style={{marginVertical: 10}}>
              <Button title="Você postou essa vaga" color={'#6495ED'} />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
