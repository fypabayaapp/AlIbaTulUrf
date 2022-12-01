import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatingTextInput from '../../../components/FloatingTextInput';
import colors from '../../../config/colors';
import {ActivityIndicator} from 'react-native-paper';
import {LoginUser} from '../../../util/user';
const CustomerSignIn = ({navigation}) => {
  const [Pvisible, setPvisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);

  const ContxAuth = useContext(AuthContext);

  async function Login() {
    setLoading(true);

    const data = await LoginUser(email, password);
    if (data?.token) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('mode', 'customer');
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      setLoading(false);
      ContxAuth.authenticate(data.token, data.user, 'customer');
    }
    setLoading(false);
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
    <ScrollView>
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
            marginBottom: -10,
          }}>
          Enter Your Information
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
          <TouchableOpacity
            style={{
              margin: 20,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: '#1776BA',
              borderRadius: 10,
              width: 200,
              borderWidth: 0.5,
              alignItems: 'center',
            }}
            onPress={() => validate()}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <Text style={{color: 'grey'}}>
            ------------------------------or------------------------------
          </Text>
          <TouchableOpacity
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: 'white',
              //borderRadius: 10,
              width: 200,
              //borderWidth: 0.5,
              alignItems: 'center',
              borderColor: 'grey',
            }}
            onPress={() => navigation.navigate('CustomerSignUp')}>
            <Text
              style={{
                color: '#1776BA',
                //fontWeight: "bold",
                fontSize: 15,
                marginBottom: 47,
              }}>
              Create an Account
            </Text>
          </TouchableOpacity>
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

export default CustomerSignIn;
