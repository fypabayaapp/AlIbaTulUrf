import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import FloatingTextInput from '../../../components/FloatingTextInput';
import colors from '../../../config/colors';
import {SignUpUser} from '../../../util/user';

const CustomerSignUp = ({navigation}) => {
  const [inputs, setInputData] = useState({
    Name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    ConfirmPassword: '',
  });
  const [Pvisible, setPvisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);
  const [image, SetImage] = useState(null);

  async function SignUp() {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', {
      name: `pic ${new Date()} `,
      uri: image.path,
      type: image.mime,
    });
    formData.append('username', inputs.Name);
    formData.append('email', inputs.email);
    formData.append('address', inputs.address);
    formData.append('contact', inputs.phone);
    formData.append('password', inputs.password);
    await SignUpUser(formData);
    setLoading(false);
  }
  if (Loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }
  function ChangeValue(value, input) {
    setInputData(curInput => {
      return {...curInput, [input]: value};
    });
  }

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    setErrors({});
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.Name) {
      handleError('Please input fullname', 'Name');
      isValid = false;
    }
    if (!inputs.address) {
      handleError('Please input address', 'address');
      isValid = false;
    }
    if (!inputs.phone) {
      handleError('Please input Phone', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 6) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }
    if (!inputs.ConfirmPassword) {
      handleError('Please Confirm your password', 'ConfirmPassword');
      isValid = false;
    } else if (inputs.password !== inputs.ConfirmPassword) {
      handleError('Both Passwords Should be same', 'ConfirmPassword');
      isValid = false;
    }

    if (isValid) {
      // JSON.stringify(inputs);
      SignUp();
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  async function ImageGetter() {
    ImagePicker.openPicker({
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.7,

      cropping: true,
    })
      .then(image => {
        SetImage(image);
      })
      .catch(e => Alert.alert(`${e}` || ` Something went wrong`));
  }

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
          }}>
          Create Your Account
        </Text>
        <TouchableOpacity onPress={() => ImageGetter()}>
          {!image ? (
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                width: 380,
                height: 300,
                marginBottom: 8,
              }}>
              <Icon name="images-outline" size={100} color={'grey'} />
            </View>
          ) : (
            <View
              style={{
                padding: 20,
                backgroundColor: 'white',
                width: 380,
                height: 300,
                alignItems: 'center',
                borderRadius: 90,
              }}>
              <Image
                style={{
                  borderRadius: 120,
                  width: '80%',
                  height: '90%',
                  marginBottom: 8,
                  resizeMode: 'contain',
                  backgroundColor: 'white',
                }}
                source={{uri: image.path}}
                resizeMode={'contain'}
              />
            </View>
          )}
        </TouchableOpacity>
        <FloatingTextInput
          label={'User Name'}
          icon={'person-outline'}
          TextValue={value => ChangeValue(value, 'Name')}
          Holder={inputs.Name}
          error={errors.Name}
        />
        <FloatingTextInput
          label={'Email'}
          icon={'mail-outline'}
          TextValue={value => ChangeValue(value, 'email')}
          Holder={inputs.email}
          error={errors.email}
        />
        <FloatingTextInput
          label={'Address'}
          icon={'home-outline'}
          TextValue={value => ChangeValue(value, 'address')}
          Holder={inputs.address}
          error={errors.address}
        />
        <FloatingTextInput
          label={'Phone Number'}
          icon={'call-outline'}
          type={'number-pad'}
          TextValue={value => ChangeValue(value, 'phone')}
          Holder={inputs.phone}
          error={errors.phone}
        />
        <FloatingTextInput
          label={'Password'}
          icon={Pvisible ? 'lock-open-outline' : 'lock-closed-outline'}
          TextValue={value => ChangeValue(value, 'password')}
          secure={Pvisible ? false : true}
          Holder={inputs.password}
          Endicon={Pvisible ? 'eye-off-outline' : 'eye-outline'}
          EndPress={() => (Pvisible ? setPvisible(false) : setPvisible(true))}
          error={errors.password}
        />
        <FloatingTextInput
          label={'Confirm Password'}
          icon={Pvisible ? 'lock-open-outline' : 'lock-closed-outline'}
          TextValue={value => ChangeValue(value, 'ConfirmPassword')}
          Holder={inputs.ConfirmPassword}
          secure={Pvisible ? false : true}
          Endicon={Pvisible ? 'eye-off-outline' : 'eye-outline'}
          EndPress={() => (Pvisible ? setPvisible(false) : setPvisible(true))}
          error={errors.ConfirmPassword}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 17,
          }}>
          <TouchableOpacity
            style={{
              margin: 10,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: '#1776BA',
              borderRadius: 10,
              width: 200,
              borderWidth: 0.5,
              alignItems: 'center',
            }}
            onPress={validate}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Sign Up
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

export default CustomerSignUp;
