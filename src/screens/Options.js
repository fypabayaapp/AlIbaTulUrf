import React from 'react';
import {View, Button, Text, Image, TouchableOpacity} from 'react-native';

const Options = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <Image
        style={{height: 400, width: 420}}
        source={require('../assets/Logo.png')}
      />
      <Text
        style={{
          fontSize: 30,
          color: '#1776BA',
          fontWeight: 'bold',
          //margin: 20,
        }}>
        Who are you?
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <TouchableOpacity
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            width: 200,
            borderWidth: 0.5,
            alignItems: 'center',
            borderColor: 'grey',
          }}
          onPress={() => navigation.navigate('CustomerSignIn')}>
          <Text
            style={{
              color: '#1776BA',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Customer
          </Text>
        </TouchableOpacity>

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
          onPress={() => navigation.navigate('AdminSignIn')}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Admin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Options;
