import React from 'react';
import {View, Button, Text, Image, TouchableOpacity} from 'react-native';

const Splash = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
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
          margin: 20,
        }}>
        Get yourself nice and comfortable Abaya's
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: '#1776BA',
          margin: 23,
          marginTop: -10,
        }}>
        Customize already available abaya's or from scratch
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
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
          onPress={() => navigation.navigate('Instructions')}>
          <Text
            style={{
              color: '#1776BA',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Instructions
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
          onPress={() => navigation.navigate('Options')}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Get Started!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Splash;
