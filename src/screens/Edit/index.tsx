import React, {useState} from 'react';
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {styleForm, theme} from '../../theme';
import {InputCompomnent} from '../../components/Input';
import {RoutesPath} from '../../utils/routesPath';
import {api} from '../../api/api';
import {faAt, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {auth, selectAuth} from '../../store/userSlice';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user_default from '../../assets/user_default.png';
import {styles} from './styles';
import {ScreenEdit} from '../../utils/routesType/rootScreenProps';

interface PropsValue {
  email: string;
  password: string;
  new_password?: string;
  name: string;
  avatar: string;
  role?: string;
}

export function Edit({route, navigation}: ScreenEdit) {
  const {user, token} = useSelector(selectAuth);
  const [imageUri, setImageUri] = useState<Asset[]>();
  const [message, setMessage] = useState('');
  const [inCaseErrorImage, setInCaseErrorImage] = useState(false);

  const dispatch = useDispatch();

  const setImage = inCaseErrorImage
    ? user_default
    : {uri: `${RoutesPath.SERVER}uploads/${user.avatar}`};

  useFocusEffect(
    React.useCallback(() => {
      async function init() {
        console.log('EDIT');

        const {values} = route.params;

        if (!values) {
          navigation.navigate('AuthStack', {screen: 'Error'});
        }
      }
      init();
    }, []),
  );

  const initials = {
    email: '',
    password: '',
    new_password: '',
    name: '',
    avatar: '',
  };
  const initialValues = {
    email: user.email,
    password: '',
    new_password: '',
    name: user.name,
    avatar: user.avatar,
  };
  const initialErrors = {...initials};

  async function onSubmit(values: PropsValue) {
    setMessage('');

    try {
      const data = new FormData();

      if (imageUri !== undefined) {
        data.append('avatar', {
          fileName: imageUri[0].fileName,
          uri: imageUri[0].uri,
          type: 'image/png',
          name: imageUri[0].fileName,
        });
      } else {
        data.append('avatar', user.avatar);
      }

      data.append('email', values.email);
      data.append('password', values.password);
      data.append('new_password', values.new_password);
      data.append('name', values.name);

      const response = await api.put(RoutesPath.USER_UPDATE, data, {
        headers: {'Content-Type': 'multipart/form-data'},
        params: {
          Authorization: `Bearer ${token}`,
        },
      });

      await AsyncStorage.setItem(
        '@mobilinho:authToken',
        JSON.stringify(response.data),
      );

      dispatch(auth({user: response.data.data[0], token: response.data.token}));

      ToastAndroid.show('Perfil atualizado', ToastAndroid.BOTTOM);
      setMessage('');
    } catch (err: any) {
      setMessage(err.response.data.error ?? err.response.data);
    }
  }

  function validate(values: PropsValue) {
    const err = {} as PropsValue;

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

  const handleUpload = async () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    await launchImageLibrary(options, response => {
      if (response.assets) {
        setImageUri(response.assets);
      }
      if (response.didCancel) {
        ToastAndroid.show('Galeria fechada', ToastAndroid.BOTTOM);
      }
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{
          backgroundColor: theme.colors.backgroundSubmit,
        }}
        enabled>
        <Formik
          initialValues={initialValues}
          initialErrors={initialErrors}
          validate={values => validate(values)}
          onSubmit={values => onSubmit(values)}>
          {({handleChange, handleSubmit, touched, errors, values}) => (
            <View style={styles.form}>
              <View style={styles.content}>
                <View style={styles.contentAvatar}>
                  <Image
                    onError={() => {
                      setInCaseErrorImage(true);
                    }}
                    source={imageUri ? {uri: imageUri[0].uri} : setImage}
                    resizeMode={'center'}
                    style={styles.avatar}
                  />

                  <TouchableOpacity style={{marginVertical: 20}}>
                    <Button onPress={handleUpload} title="trocar foto" />
                  </TouchableOpacity>
                </View>

                {errors.name && touched.name ? (
                  <Text style={styleForm.text}>
                    <Text style={styleForm.brandRed}>*</Text>
                    {errors.name}
                  </Text>
                ) : null}

                <InputCompomnent
                  handleChange={handleChange('name')}
                  value={values.name}
                  icon={faUser}
                  placeholder={'Digite seu nome'}
                />

                {errors.email && touched.email ? (
                  <Text style={styleForm.text}>
                    <Text style={styleForm.brandRed}>*</Text>
                    {errors.email}
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
                    <Text style={styleForm.brandRed}>*</Text>
                    {errors.password}
                  </Text>
                ) : null}

                <InputCompomnent
                  handleChange={handleChange('password')}
                  value={values.password}
                  icon={faLock}
                  secureTextEntry={true}
                  placeholder={'Digite sua senha atual'}
                />

                <InputCompomnent
                  handleChange={handleChange('new_password')}
                  value={values.new_password}
                  icon={faLock}
                  secureTextEntry={true}
                  placeholder={'Nova senha (não obrigatoria)'}
                />

                {Object.values(message).length > 0
                  ? Object.entries(message).map(([_, value]) => {
                      return (
                        <Text style={styleForm.text}>
                          <Text style={styleForm.brandRed}>*</Text>
                          {value}
                        </Text>
                      );
                    })
                  : null}

                <Button title="Enviar" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
