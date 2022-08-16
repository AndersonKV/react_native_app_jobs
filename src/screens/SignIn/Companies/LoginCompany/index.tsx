import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Button,
} from 'react-native';

import {faLock, faAt} from '@fortawesome/free-solid-svg-icons';
import {styleForm, theme} from '../../../../theme';
import {Formik} from 'formik';
import {InputCompomnent} from '../../../../components/Input';
import {CustomButton} from '../../../../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {RoutesPath} from '../../../../utils/routesPath';
import {api} from '../../../../api/api';
import {ScreenSignIn} from '../../../../utils/routesType/rootScreenProps';
import {useDispatch} from 'react-redux';
import {auth} from '../../../../store/userSlice';

interface PropsLogin {
  email: string;
  password: string;
}
export function LoginCompany({navigation}: ScreenSignIn) {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  async function onSubmit(values: PropsLogin) {
    setMessage('');

    try {
      const formData = values;

      const response = await api.post(RoutesPath.USER_LOGIN, formData);

      const {data, token} = response.data;

      if (data) {
        await AsyncStorage.setItem(
          '@mobilinho:authToken',
          JSON.stringify(response.data),
        );

        dispatch(auth({user: data[0], token: token}));

        navigation.navigate('AuthTabStack', {screen: 'ListJobs'});
      }
    } catch (err: any) {
      console.log(err.response.data);
      setMessage(err.response.data.error ?? err.response.data);
    }
  }

  function validate(values: PropsLogin) {
    const err = {} as PropsLogin;

    let regex = new RegExp(
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    );

    if (values.email.length === 0 || regex.test(values.email) === false) {
      err.email = 'Email formatado';
    }

    if (values.password.length < 8) {
      err.password = 'A senha deve ter 8 digitos';
    }

    return err;
  }

  const initials = {email: '', password: ''};
  const initialValues = {...initials};
  const initialErrors = {...initials};

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
          {({handleChange, handleSubmit, touched, errors, values}) => (
            <View style={styleForm.form}>
              <View style={{flexDirection: 'row'}}>
                <CustomButton background="#fff" color="#000" title="Login" />
                <CustomButton
                  background="#d3d3d3"
                  color="#808080"
                  title="Cadastrar-se"
                  navigate={() => {
                    navigation.navigate('RegisterCompany');
                  }}
                />
              </View>

              <View style={styleForm.content}>
                <InputCompomnent
                  handleChange={handleChange('email')}
                  value={values.email}
                  icon={faAt}
                  placeholder={'Digite seu email'}
                  keyboardType={'email-address'}
                />
                {errors.email && touched.email ? (
                  <Text style={styleForm.text}>
                    <Text style={styleForm.brandRed}>*</Text> {errors.email}
                  </Text>
                ) : null}

                <InputCompomnent
                  handleChange={handleChange('password')}
                  value={values.password}
                  icon={faLock}
                  secureTextEntry={true}
                  placeholder={'Digite sua senha'}
                />
                {errors.password && touched.password ? (
                  <Text style={styleForm.text}>
                    <Text style={styleForm.brandRed}>*</Text> {errors.password}
                  </Text>
                ) : null}

                {Object.values(message).length > 0
                  ? Object.entries(message).map(([key, value]) => {
                      return (
                        <Text key={key} style={styleForm.text}>
                          <Text style={styleForm.brandRed}>*</Text> {value}
                        </Text>
                      );
                    })
                  : null}
                <Button onPress={handleSubmit} title="Entrar" />
              </View>

              <Button
                onPress={() => {
                  navigation.navigate('LoginUser');
                }}
                title="entrar como usuário"
                color={'#3e3e'}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
