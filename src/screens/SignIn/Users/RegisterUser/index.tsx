import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Button,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {faLock, faAt, faUser} from '@fortawesome/free-solid-svg-icons';
import {styleForm, theme} from '../../../../theme';
import {Formik} from 'formik';
import {InputCompomnent} from '../../../../components/Input';
import {CustomButton} from '../../../../components/Button';

import {api} from '../../../../api/api';
import {RoutesPath} from '../../../../utils/routesPath';
import {ScreenSignIn} from '../../../../utils/routesType/rootScreenProps';

interface PropsRegisterUser {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
}

export function RegisterUser({navigation}: ScreenSignIn) {
  const [message, setMessage] = useState('');

  async function onSubmit(values: PropsRegisterUser) {
    setMessage('');
    console.log({values});

    try {
      const formData = values;

      const response = await api.post(RoutesPath.USER_REGISTER, formData);

      const {data} = response.data;

      if (data) {
        ToastAndroid.show('Conta criada com successo', ToastAndroid.TOP);
      }
    } catch (err: any) {
      setMessage(err.response.data.error ?? err.response.data);
    }
  }

  function validate(values: PropsRegisterUser) {
    const err = {} as PropsRegisterUser;

    let regex = new RegExp(
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    );

    if (values.email.length === 0 || regex.test(values.email) === false) {
      err.email = 'Email formatado';
    }

    if (values.password.trim().length < 8) {
      err.password = 'A senha deve ter 8 digitos';
    }

    if (
      values.password.length < 8 ||
      values.password !== values.confirm_password
    ) {
      err.confirm_password = 'As senhas devem ser iguais';
    }

    if (values.name.trim().length < 6 || values.name.trim().length > 30) {
      err.name = 'Nome deve ter entre 6 e 30 caracteres';
    }

    return err;
  }

  const initials = {email: '', password: '', confirm_password: '', name: ''};

  const initialValues = {
    ...initials,
    role: 'USER',
  };
  const initialErrors = {
    ...initials,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{
          backgroundColor: theme.colors.backgroundForm,
        }}
        enabled>
        <Formik
          initialValues={initialValues}
          initialErrors={initialErrors}
          validate={values => validate(values)}
          onSubmit={values => onSubmit(values)}>
          {({handleChange, handleSubmit, errors, touched, values}) => (
            <View style={styleForm.form}>
              <View style={{flexDirection: 'row'}}>
                <CustomButton
                  background="#d3d3d3"
                  color="#808080"
                  title="Login"
                  navigate={() => {
                    navigation.push('LoginUser');
                  }}
                />
                <CustomButton
                  background="#fff"
                  color="#000"
                  title="Registrar"
                />
              </View>
              <View style={styleForm.content}>
                {errors.name && touched.name ? (
                  <Text style={styleForm.text}>
                    <Text style={styleForm.brandRed}>*</Text> {errors.name}
                  </Text>
                ) : null}

                <InputCompomnent
                  handleChange={handleChange('name')}
                  value={values.name}
                  icon={faUser}
                  keyboardType={'email-address'}
                  placeholder={'Digite seu nome'}
                />

                {errors.email && touched.email ? (
                  <Text style={styleForm.text}>
                    <Text style={styleForm.brandRed}>*</Text> {errors.email}
                  </Text>
                ) : null}

                <InputCompomnent
                  handleChange={handleChange('email')}
                  value={values.email}
                  icon={faAt}
                  placeholder={'Digite seu email'}
                  keyboardType={'email-address'}
                />

                {errors.password && touched.password ? (
                  <Text style={styleForm.text}>
                    <Text style={styleForm.brandRed}>*</Text> {errors.password}
                  </Text>
                ) : null}

                <InputCompomnent
                  handleChange={handleChange('password')}
                  value={values.password}
                  icon={faLock}
                  placeholder={'Digite sua senha'}
                  secureTextEntry={true}
                />

                {errors.confirm_password && touched.confirm_password ? (
                  <Text style={styleForm.text}>
                    <Text style={styleForm.brandRed}>*</Text>{' '}
                    {errors.confirm_password}
                  </Text>
                ) : null}

                <InputCompomnent
                  handleChange={handleChange('confirm_password')}
                  value={values.confirm_password}
                  icon={faLock}
                  placeholder={'Confirme sua senha'}
                  secureTextEntry={true}
                />

                {Object.values(message).length > 0
                  ? Object.entries(message).map(([key, value]) => {
                      return (
                        <Text style={styleForm.text}>
                          <Text style={styleForm.brandRed}>*</Text> {value}
                        </Text>
                      );
                    })
                  : null}

                <Button onPress={handleSubmit} title="Entrar" />
              </View>
              <Button
                onPress={() => navigation.push('LoginCompany')}
                title="entrar como compania?"
                color={'#3e3e'}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
