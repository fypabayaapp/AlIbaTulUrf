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
  SafeAreaView,
  Dimensions,
  Keyboard,
  Alert,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingTextInput from '../components/FloatingTextInput';

import colors from '../config/colors';
import {AuthContext} from '../Context/AuthContext';
import {ImageUpdate, ProfileUpdate, SignUpUser} from '../util/user';
const {height} = Dimensions.get('window');

const EditProfile = ({navigation}) => {
  const ContxAuth = useContext(AuthContext);
  const User = ContxAuth.Data;
  const mode = ContxAuth.mode == 'admin';
  const token = ContxAuth.token;

  const [inputs, setInputData] = useState({
    Name: User.username,
    phone: User.contact,
  });
  const [Pvisible, setPvisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);
  const [UploadImage, setUpload] = useState(false);
  const [image, SetImage] = useState({path: User.avatar});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    setErrors({});

    if (!inputs.Name) {
      handleError('Please input fullname', 'Name');
      isValid = false;
    }
    if (!inputs.phone) {
      handleError('Please input Phone', 'phone');
      isValid = false;
    }

    if (isValid) {
      // JSON.stringify(inputs);
      EditProfile();
    }
  };
  function ChangeValue(value, input) {
    setInputData(curInput => {
      return {...curInput, [input]: value};
    });
  }

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  async function EditProfile() {
    setLoading(true);
    await ProfileUpdate({username: inputs.Name, contact: inputs.phone}, token);
    setLoading(false);
  }

  async function EditImage() {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', {
      name: `pic ${new Date()} `,
      uri: image.path,
      type: image.mime,
    });
    await ImageUpdate(formData, token);

    setLoading(false);
  }

  async function ImageGetter() {
    ImagePicker.openPicker({
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.7,

      cropping: true,
    })
      .then(image => {
        setUpload(true);
        SetImage(image);
      })
      .catch(err => Alert.alert(`${err}` || 'Something went wrong'));
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      {!mode && (
        <View style={styles.header}>
          <Icon
            name="sort-variant"
            size={28}
            onPress={() => navigation.toggleDrawer()}
          />
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Profile
          </Text>
        </View>
      )}

      <View style={styles.mainContainer}>
        <ScrollView
          // style={{paddingVertical: '30%'}}
          contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: '30%',
          }}>
          <Image
            style={{
              height: 100,
              width: 110,
              borderRadius: 50,
              marginBottom: 30,
            }}
            source={{uri: image.path}}
          />
          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderRadius: 10,
              marginTop: -45,
              marginLeft: 65,
              borderColor: '#1776BA',
              marginBottom: 30,
            }}
            onPress={() => {
              ImageGetter();
            }}>
            <Ionicon
              color="black"
              name="add"
              size={25}
              style={{color: '#1776BA'}}
            />
          </TouchableOpacity>

          {UploadImage && (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                borderWidth: 3,
                borderRadius: 10,
                marginTop: -20,
                marginLeft: 65,
                borderColor: 'green',
                marginBottom: 30,
                flexDirection: 'row',
              }}
              onPress={() => {
                EditImage();
              }}>
              <Ionicon
                color="black"
                name="checkbox"
                size={25}
                style={{color: '#1776BA'}}
              />
              <Text
                style={{
                  color: 'black',
                  paddingHorizontal: 8,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Upload
              </Text>
            </TouchableOpacity>
          )}
          <FloatingTextInput
            label={inputs.Name}
            icon={'person-outline'}
            TextValue={value => ChangeValue(value, 'Name')}
            Holder={inputs.Name}
            error={errors.Name}
          />

          <FloatingTextInput
            label={inputs.phone}
            icon={'call-outline'}
            type={'number-pad'}
            TextValue={value => ChangeValue(value, 'phone')}
            Holder={inputs.phone}
            error={errors.phone}
          />

          {/* profile  ------------------ */}
          <TouchableOpacity
            style={{
              marginTop: 20,
              paddingVertical: 10,
              backgroundColor: 'white',
              borderRadius: 10,
              width: 200,
              borderWidth: 0.5,
              alignItems: 'center',
              borderColor: 'grey',
            }}
            onPress={validate}>
            <Text
              style={{
                color: '#1776BA',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
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
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    borderRadius: 650,
    backgroundColor: colors.light,
    justifyContent: 'center',
  },
});

export default EditProfile;
