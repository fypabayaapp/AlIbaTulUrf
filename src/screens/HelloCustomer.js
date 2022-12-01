import React, {useContext} from 'react';
import {View, Button, Text, Image, TouchableOpacity} from 'react-native';
import {AuthContext} from '../Context/AuthContext';

const HelloCustomer = ({navigation}) => {
  const ContxAuth = useContext(AuthContext);
  const User = ContxAuth.Data;
  const username = User.username;
  return (
    <View
      style={{
        flex: 0.3,
        backgroundColor: '#1776BA',
        alignItems: 'center',
      }}>
      <Text style={{marginTop: 20, fontSize: 15, color: 'white'}}>Hello!</Text>
      <Text
        style={{
          marginTop: 2,
          fontSize: 25,
          color: 'white',
          fontWeight: 'bold',
          borderBottomWidth: 2,
          //borderStyle: "dotted",
          borderColor: 'white',
        }}
        onPress={() => navigation.navigate('PROFILE')}>
        {username}
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          height: 550,
          width: 350,
          marginTop: 40,
          borderWidth: 0.3,
          alignItems: 'center',
        }}>
        <Image
          style={{height: 370, width: 300}}
          source={require('../assets/Logo.png')}
        />
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
              width: 300,
              borderWidth: 0.5,
              alignItems: 'center',
              borderColor: 'grey',
            }}
            onPress={() => navigation.navigate('Custom-Order')}>
            <Text
              style={{
                color: '#1776BA',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Customize from scratch
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              margin: 10,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: '#1776BA',
              borderRadius: 10,
              width: 300,
              borderWidth: 0.5,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Home')}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Select from cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HelloCustomer;
