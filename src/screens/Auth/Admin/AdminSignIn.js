import axios from '../../../Axios';
import React, {useContext, useState} from 'react';
import {
  View,
  Button,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatingTextInput from '../../../components/FloatingTextInput';
import GeneralButton from '../../../components/GeneralButton';
import {AuthContext} from '../../../Context/AuthContext';
import {url} from '../../../util/user';
import colors from '../../../config/colors';

const AdminSignIn = () => {
  const [Pvisible, setPvisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);

  const ContxAuth = useContext(AuthContext);

  async function Login() {
    setLoading(true);

    try {
      const {data} = await axios.post(`/admin/login`, {email, password});

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('mode', 'admin');
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      setLoading(false);
      Alert.alert(data.message);
      // 'newRes.user.username';
      ContxAuth.authenticate(data.token, data.user, 'admin');
      // setLoading(false);
    } catch (e) {
      setLoading(false);

      Alert.alert(e?.response?.data?.message);
    }
  }

  if (Loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    setErrors({});
    if (!email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (password.length < 6) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      Login();
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 400, width: 420}}
          source={require('../../../assets/Logo.png')}
        />
        <Text
          style={{
            fontSize: 30,
            color: '#1776BA',
            fontWeight: 'bold',
            //margin: 20,
          }}>
          Confirm Your Identity
        </Text>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              marginTop: 40,
            }}>
            <FloatingTextInput
              label={'Email'}
              // icon={'mail-outline'} you can add the icons in textinput
              TextValue={value => setEmail(value.toLowerCase())}
              Holder={email}
              error={errors.email}
            />
            <FloatingTextInput
              label={'Password'}
              TextValue={value => setPassword(value)}
              Holder={password}
              // IconColor={'black'}
              secure={Pvisible ? false : true}
              Endicon={Pvisible ? 'eye-off-outline' : 'eye-outline'}
              EndPress={() =>
                Pvisible ? setPvisible(false) : setPvisible(true)
              }
              error={errors.password}
            />
          </View>
          <GeneralButton title={'SignIn'} onPress={validate} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.3,
    width: 300,
    height: 50,
    padding: 8,
    margin: 6,
  },
});

export default AdminSignIn;
