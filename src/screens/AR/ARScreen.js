import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ARScreen({navigation, route}) {
  const abayaData = route.params;
  // console.log(abayaData);

  const [image, SetImage] = useState(null);

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
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log(image);
        SetImage(image);
      })
      .catch(e => Alert.alert(`${e}` || ` Something went wrong`));
  };

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Icon
          color={'white'}
          style={{padding: '10%'}}
          name="sort-variant"
          size={28}
          onPress={navigation.toggleDrawer}
        />
        <TouchableOpacity onPress={takePhotoFromCamera}>
          <Icon
            color={'white'}
            style={{padding: '10%'}}
            name="plus-circle"
            size={40}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => ImageGetter()}>
        {!image ? (
          <View style={styles.imgBack}>
            <Ionicons name="images-outline" size={100} color={'grey'} />
          </View>
        ) : (
          <View style={styles.imgShow}>
            <Image
              style={styles.imgMain}
              source={{uri: image.path}}
              resizeMode={'contain'}
            />
          </View>
        )}
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: 'white',
          height: '60%',
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          overflow: 'scroll',
          alignItems: 'center',
          padding: '10%',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 25,
            fontWeight: 'bold',
            paddingBottom: '5%',
          }}>
          ARScreen
        </Text>
        <View style={{padding: '5%', borderWidth: 1, borderRadius: 30}}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              borderBottomWidth: 1,
            }}>
            Instructions:
          </Text>
          <Text style={{color: 'black', fontSize: 14}}>
            Make sure the image is taken in a bright place{`\n`}Make sure you
            are standing straight towards the camera{`\n`}Your hands should be
            in front
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgBack: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    width: 350,
    height: 300,
    marginBottom: 8,
  },
  imgShow: {
    padding: 20,
    backgroundColor: 'white',
    width: 350,
    height: 300,
    alignItems: 'center',
    borderRadius: 50,
  },
  imgMain: {
    borderRadius: 50,
    width: '80%',
    height: '90%',
    marginBottom: 8,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
});
