import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator, Button, Checkbox} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../../../../Axios';
import colors from '../../../../config/colors';
import {AuthContext} from '../../../../Context/AuthContext';

function Posting({navigation}) {
  const [image, SetImage] = useState();

  const ContxAuth = useContext(AuthContext);
  const token = ContxAuth.token;
  const [inputs, setInputData] = useState({
    discription: '',
    name: '',
    price: '',
    color: '',
    pearls: false,
    scarf: false,
    length: '',
    width: '',
    stock: '1',
  });

  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);

  async function Post() {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', {
      name: `image ${new Date()} `,
      uri: image.path,
      type: image.mime,
    });
    formData.append('name', inputs.name);
    formData.append('discription', inputs.discription);
    formData.append('width', inputs.width);
    formData.append('length', inputs.length);
    formData.append('color', inputs.color);
    formData.append('price', inputs.price);
    formData.append('pearls', inputs.pearls);
    formData.append('scarf', inputs.scarf);
    formData.append('stock', inputs.stock);
    try {
      const {data} = await axios(`/product/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          authorization: token,
        },
        data: formData,
      });
      setLoading(false);
      Alert.alert('Post Successfully', ` 🎉 ${data.message}... 🎉`);
      setInputData({
        discription: '',
        name: '',
        price: '',
        color: '',
        pearls: false,
        scarf: false,
        length: '',
        width: '',
      });
    } catch (e) {
      Alert.alert(`${e?.response?.data?.message}` || ` Something went wrong`);
      setLoading(false);
    }
    setLoading(false);
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

    if (!inputs.name) {
      handleError('Please name your P et', 'Short Name');
      isValid = false;
    }
    if (!inputs.price) {
      Alert.alert('Warning', 'Please enter Price');
      isValid = false;
    }

    if (isValid) {
      JSON.stringify(inputs);
      Post();
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
      .catch(ee => Alert.alert(`${e}` || ` Something went wrong`));
  }

  return (
    <SafeAreaView
      style={{flex: 1, overflow: 'hidden', backgroundColor: colors.primary}}>
      <View style={styles.header}>
        {/* <Icon name="list" size={28} onPress={() => navigation.toggleDrawer()} /> */}
      </View>
      <ScrollView
        style={{
          borderRadius: 100,
          backgroundColor: 'white',
          paddingVertical: 20,
        }}
        contentContainerStyle={{
          justifyContent: 'center',
        }}>
        {/* <Text>Posting</Text> */}
        <View
          style={{
            marginHorizontal: 10,
            justifyContent: 'center',
            overflow: 'hidden',
            alignItems: 'center',
            paddingBottom: 90,
          }}>
          <TouchableOpacity onPress={() => ImageGetter()}>
            {!image ? (
              <View
                style={{
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  width: 380,
                  height: 300,
                  overflow: 'hidden',

                  // marginBottom: 8,
                }}>
                <Icon name="images-outline" size={100} color={'grey'} />
              </View>
            ) : (
              <View
                style={{
                  padding: 15,
                  backgroundColor: colors.background,
                  borderRadius: 100,
                  width: 380,
                  height: 300,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    borderRadius: 10,
                    width: '100%',
                    height: '100%',
                    backgroundColor: colors.background,

                    resizeMode: 'contain',
                  }}
                  source={{uri: image.path}}
                  resizeMode={'contain'}
                />
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="name"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={inputs.name}
            onChangeText={value => ChangeValue(value, 'name')}
          />
          <TextInput
            placeholder="color"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={inputs.color}
            onChangeText={value => ChangeValue(value, 'color')}
          />

          <TextInput
            placeholder="width"
            placeholderTextColor={'grey'}
            style={styles.input}
            keyboardType="numeric"
            value={inputs.width}
            onChangeText={value => ChangeValue(value, 'width')}
          />
          <TextInput
            placeholder="length"
            placeholderTextColor={'grey'}
            style={styles.input}
            keyboardType="numeric"
            value={inputs.length}
            onChangeText={value => ChangeValue(value, 'length')}
          />

          <TextInput
            placeholder="price"
            placeholderTextColor={'grey'}
            style={styles.input}
            keyboardType="numeric"
            value={inputs.price}
            onChangeText={value => ChangeValue(value, 'price')}
          />
          <TextInput
            placeholder="stock"
            placeholderTextColor={'grey'}
            style={styles.input}
            keyboardType="numeric"
            value={inputs.stock}
            onChangeText={value => ChangeValue(value, 'stock')}
          />
          <TextInput
            placeholder="discription"
            placeholderTextColor={'grey'}
            multiline={true}
            style={[styles.input, {width: '90%'}]}
            value={inputs.discription}
            onChangeText={value => ChangeValue(value, 'discription')}
          />
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Checkbox
                status={inputs.scarf ? 'checked' : 'unchecked'}
                onPress={() => {
                  ChangeValue(!inputs.scarf, 'scarf');
                  // setChecked(!checked);
                }}
              />
              <Text style={{color: 'black', fontSize: 14}}>Scarf</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: '10%',
              }}>
              <Checkbox
                status={inputs.pearls ? 'checked' : 'unchecked'}
                onPress={() => {
                  ChangeValue(!inputs.pearls, 'pearls');
                  // setChecked(!checked);
                }}
              />
              <Text style={{color: 'black', fontSize: 14}}>Pearls</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={validate}
            style={[
              styles.Button,
              {
                borderColor: colors.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textButton,
                {
                  color: colors.primary,
                },
              ]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Posting;

const styles = StyleSheet.create({
  input: {
    // height: ,
    width: '80%',
    marginTop: 18,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
  },
  Button: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
