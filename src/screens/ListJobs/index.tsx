import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import {Formik} from 'formik';
import {JobContent} from '../../components/JobContent';
import {DropDown} from '../../components/DropMenuDown';
import {api} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, useSelector} from 'react-redux';
import {selectJob, setData} from '../../store/jobSlice';
import {auth, selectAuth} from '../../store/userSlice';
import {styles} from './styles';
import {arrayTechs} from '../../utils/utils';
import {RoutesPath} from '../../utils/routesPath';
import {useFocusEffect} from '@react-navigation/native';
import {DropDownTechList} from '../../components/DropDownTechList';
import {JobInterface} from '../../utils/types';
import {ScreenJobList} from '../../utils/routesType/rootScreenProps';
interface FormsProps {
  size_company: string;
  types_contract: string;
  experience_level: string;
  remote: string;
}

export function ListJobs({navigation}: ScreenJobList) {
  const [dropdown, setDropDown] = useState(false);
  const {user} = useSelector(selectAuth);
  const {jobs} = useSelector(selectJob);
  const {token} = useSelector(selectAuth);
  const [language, setLanguage] = useState<String[]>();
  const [displayTechList, setDisplayTechList] = useState(false);
  const [linguageInDisplay, setLinguageInDisplay] = useState('todos');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      async function init() {
        console.log('useEffect - CHEGAMOS NO ListJobs ');

        try {
          arrayTechs.map(val => val.toUpperCase().replace(' ', '-'));

          setLanguage(arrayTechs);

          // const getStorage = await AsyncStorage.getItem('@mobilinho:jobList');
          // const getAuth = getStorage ? JSON.parse(String(getStorage)) : [];

          // if (!getAuth.length) {
          //   navigation.navigate('AuthStack', {screen: 'LoginOut'});
          // }

          const response = await api.get(RoutesPath.LIST_JOBS);

          await AsyncStorage.setItem(
            '@mobilinho:jobList',
            JSON.stringify(response.data.data),
          );

          setMessage(
            `Nossas ultimas vagas (${response.data.data.length || 0})`,
          );

          dispatch(setData({jobs: response.data.data}));
        } catch (err) {
          navigation.navigate('AuthStack', {screen: 'LoginOut'});

          console.log(err);
        }
      }

      init();
    }, []),
  );

  const initialValues = {
    size_company: '',
    types_contract: '',
    experience_level: '',
    remote: '',
  };

  function onSubmit({
    experience_level,
    remote,
    size_company,
    types_contract,
  }: FormsProps) {
    api
      .get('/api/v1/jobs/find_by_tech', {
        params: {
          experience_level,
          remote,
          size_company,
          types_contract,
          tech: linguageInDisplay === 'todos' ? '' : linguageInDisplay,
        },
      })
      .then(res => {
        console.log(res.data.data.length);

        dispatch(setData({jobs: res.data.data}));
        setMessage(`Retornou ${res.data.data.length || 0} vaga(s)`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleSearch = (value: string) => {
    setLinguageInDisplay(value);
    setDisplayTechList(!displayTechList);
    api
      .get('/api/v1/jobs/find_by_tech', {
        params: {
          tech: value,
        },
      })
      .then(res => {
        dispatch(setData({jobs: res.data.data}));
        setMessage(`Retornou ${res.data.data.length || 0} vaga(s)`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClear = async () => {
    const getStorage = await AsyncStorage.getItem('@mobilinho:jobList');

    const getAuth = getStorage ? JSON.parse(String(getStorage)) : [];

    dispatch(setData({jobs: getAuth}));
    setMessage('Nossas ultimas vagas');
    setLinguageInDisplay('todos');

    displayTechList ? setDisplayTechList(!displayTechList) : null;
    dropdown ? setDropDown(!dropdown) : null;
  };

  const navigateJobDetail = (item: JobInterface) => {
    navigation.navigate('AuthStack', {
      screen: 'JobDetail',
      values: item,
      token: token,
    });
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        displayTechList ? setDisplayTechList(!displayTechList) : null
      }>
      <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
        <Text style={styles.clearText}>Limpar</Text>
      </TouchableOpacity>

      <DropDownTechList
        displayTechList={displayTechList}
        handleSearch={handleSearch}
        language={language}
        linguageInDisplay={linguageInDisplay}
        setDisplayTechList={setDisplayTechList}
      />

      <View style={{borderWidth: 1, marginVertical: 20}}>
        <TouchableOpacity
          onPress={() => {
            displayTechList ? setDisplayTechList(!displayTechList) : null;
            setDropDown(!dropdown);
          }}
          style={{padding: 10}}>
          <Text>Filtrar</Text>
        </TouchableOpacity>

        <Formik
          initialValues={initialValues}
          onSubmit={values => onSubmit(values)}>
          {({handleChange, handleSubmit}) =>
            dropdown ? (
              <View>
                <DropDown handleChange={handleChange} />

                <Button title="fazer busca" onPress={handleSubmit} />
              </View>
            ) : null
          }
        </Formik>
      </View>

      {jobs && jobs?.length > 0 ? (
        <>
          <View style={styles.boxMessage}>
            <Text style={styles.textSpan}>{message}</Text>
          </View>
          <FlatList
            style={styles.flatList}
            keyExtractor={item => item.id.toString()}
            data={jobs}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{marginVertical: 10}}
                onPress={() => navigateJobDetail(item)}>
                <JobContent
                  expired={item.expired}
                  title={item.title}
                  benefits={item.benefits}
                  experience_level={item.experience_level}
                  expired_days={item.expired_days}
                  id={item.id}
                  name_company={item.name_company}
                  remote={item.remote}
                  requirements={item.requirements}
                  responsibilities={item.responsibilities}
                  salary={item.salary}
                  size_company={item.size_company}
                  techs={item.techs}
                  types_contract={item.types_contract}
                  user_id={item.id_user}
                />
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <Text style={[styles.textSpan, {textAlign: 'center'}]}>
          poxa parece que não temos nada :(
        </Text>
      )}
    </Pressable>
  );
}
