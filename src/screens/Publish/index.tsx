import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Text,
  Button,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';

import {Formik} from 'formik';
import {styleForm, theme} from '../../theme';
import {InputCompomnent} from '../../components/Input';
import {RoutesPath} from '../../utils/routesPath';
import {api} from '../../api/api';
import {auth, selectAuth} from '../../store/userSlice';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {
  ScreenOpportunity,
  ScreenPublish,
} from '../../utils/routesType/rootScreenProps';

interface PropsForm {
  title: string;
  name_company: string;
  techs: string;
  responsibilities: string;
  requirements: string;
  types_contract: string;
  size_company: string;
  experience_level: string;
  expired_days: number | string;
  salary: number | string;
  remote: string;
  benefits: string;
}

export function Publish({navigation}: ScreenPublish) {
  const [message, setMessage] = useState('');
  const {user, token} = useSelector(selectAuth);

  useFocusEffect(
    React.useCallback(() => {
      async function init() {
        try {
          if (user.role !== 'COMPANY') {
            navigation.navigate('AuthStack', {
              screen: 'Error',
            });
          }
        } catch (err) {
          navigation.navigate('AuthStack', {
            screen: 'Error',
          });
          console.log(err);
        }
      }
      init();
    }, []),
  );

  async function onSubmit(values: PropsForm) {
    setMessage('');

    try {
      const formData = {
        ...values,
        Authorization: `Bearer ${token}`,
        techs: values.techs.trim().split(','),
      };
      const response = await api.post(RoutesPath.CREATED_JOB, formData);
      const {data} = response.data;
      if (data) {
        ToastAndroid.show('Publicação feita com sucesso', ToastAndroid.TOP);
      }
    } catch (err: any) {
      setMessage(err.response.data.error ?? err.response.data);

      console.log(err.response.data.error);
    }
  }

  function validate(values: PropsForm) {
    const err = {} as PropsForm;

    if (values.title.trim().length === 0 || values.title.length >= 60) {
      err.title = 'O titulo deve ter no maximo 60 caracteres';
    }

    if (values.name_company.trim().length === 0) {
      err.name_company = 'Nome da compania vazio';
    }

    if (values.remote !== 'sim' && values.remote !== 'não') {
      err.remote = 'Problema ao seleciona se a vaga aceita remoto ou não';
    }

    if (values.benefits.length === 0) {
      err.benefits = 'Texto não pode estar vazio';
    }

    if (values.techs.length === 0) {
      err.techs = 'Techs vazio';
    }

    if (values.requirements.length === 0) {
      err.requirements = 'requerimentos da vaga não pode ser vazio';
    }

    if (
      values.types_contract !== 'pj' &&
      values.types_contract !== 'clt' &&
      values.types_contract !== 'estagio'
    ) {
      err.types_contract = 'Error ao escolher tipo de contrato';
    }

    if (
      values.size_company !== 'pequeno' &&
      values.size_company !== 'grande' &&
      values.size_company !== 'startup'
    ) {
      err.size_company = 'Error ao escolher tamanho da empresa';
    }

    if (values.responsibilities.length === 0) {
      err.responsibilities = 'responsabilidade da vaga não pode ser vazio';
    }

    if (
      values.experience_level !== 'junior' &&
      values.experience_level !== 'pleno' &&
      values.experience_level !== 'senior'
    ) {
      err.experience_level = 'Falha ao escolher nivel de experiência';
    }

    if (
      String(values.salary).length === 0 ||
      onlyNumbers(values.salary) === false
    ) {
      err.salary = 'Valor não pode estar vazio';
    }

    if (
      String(values.expired_days).length === 0 ||
      onlyNumbers(values.expired_days) === false ||
      Number(values.expired_days) === 0
    ) {
      err.expired_days = 'data para expirar não pode ser 0';
    }

    return err;
  }

  function onlyNumbers(value: any) {
    return /^[0-9]+$/.test(value);
  }

  const initials = {
    title: '',
    name_company: '',
    techs: '',
    responsibilities: '',
    requirements: '',
    types_contract: '',
    size_company: '',
    experience_level: '',
    expired_days: '',
    salary: '',
    remote: '',
    benefits: '',
  };

  const initialValues = {
    ...initials,
  };
  const initialErrors = {
    ...initials,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundForm,
        }}
        enabled>
        <Formik
          initialValues={initialValues}
          initialErrors={initialErrors}
          validate={values => validate(values)}
          onSubmit={values => onSubmit(values)}>
          {({handleChange, handleSubmit, touched, errors, values}) => (
            <SafeAreaView style={[styles.backgroundTop]}>
              <ScrollView>
                <View style={styles.form}>
                  <Text style={styles.text}>Publique sua vaga</Text>

                  <View style={styles.content}>
                    {errors.title && touched.title ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text> {errors.title}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('title')}
                      value={values.title}
                      placeholder={'Digite o titulo'}
                    />

                    {errors.name_company && touched.name_company ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text>{' '}
                        {errors.name_company}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('name_company')}
                      value={values.name_company}
                      placeholder={'Nome da compania'}
                    />

                    {errors.techs && touched.techs ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text> {errors.techs}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('techs')}
                      value={values.techs}
                      placeholder={'ex: python, c#, c++'}
                    />

                    {errors.types_contract && touched.types_contract ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text>
                        {errors.types_contract}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('types_contract')}
                      value={values.types_contract}
                      placeholder={'Tipo de contrato, clt, pj, estagio...'}
                    />

                    {errors.size_company && touched.size_company ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text>
                        {errors.size_company}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('size_company')}
                      value={values.size_company}
                      placeholder={'empresa ex: startup, pequena, grande'}
                    />

                    {errors.experience_level && touched.experience_level ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text>
                        {errors.experience_level}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('experience_level')}
                      value={values.experience_level}
                      placeholder={'experiencia: junior, pleno, senior'}
                    />
                    {errors.expired_days && touched.expired_days ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text>
                        {errors.expired_days}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('expired_days')}
                      value={values.expired_days}
                      keyboardType={'numeric'}
                      placeholder={'Dias para expirar'}
                    />

                    {errors.salary && touched.salary ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text>
                        {errors.salary}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('salary')}
                      value={values.salary}
                      keyboardType={'numeric'}
                      placeholder={'Salário'}
                    />

                    {errors.remote && touched.remote ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text>
                        {errors.remote}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('remote')}
                      value={values.remote}
                      placeholder={'Aceita remoto, ex: sim ou não'}
                    />

                    {errors.benefits && touched.benefits ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text>
                        {errors.benefits}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('benefits')}
                      value={values.benefits}
                      placeholder={'Beneficios'}
                    />
                    <View style={{marginVertical: 20}} />

                    {errors.responsibilities && touched.responsibilities ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text>
                        {errors.responsibilities}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('responsibilities')}
                      value={values.responsibilities}
                      placeholder={'Responsabilidades'}
                      multiline={true}
                    />

                    <View style={{marginVertical: 20}} />

                    {errors.requirements && touched.requirements ? (
                      <Text style={styleForm.text}>
                        <Text style={styleForm.brandRed}>*</Text>
                        {errors.requirements}
                      </Text>
                    ) : null}

                    <InputCompomnent
                      handleChange={handleChange('requirements')}
                      value={values.requirements}
                      placeholder={'Requerimentos'}
                      multiline={true}
                    />

                    <View style={{marginVertical: 20}} />

                    {Object.values(message).length > 0
                      ? Object.entries(message).map(([key, value]) => {
                          return (
                            <Text key={key} style={styleForm.text}>
                              <Text style={styleForm.brandRed}>* </Text> {value}
                            </Text>
                          );
                        })
                      : null}

                    <Button onPress={handleSubmit} title="Publicar" />
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
