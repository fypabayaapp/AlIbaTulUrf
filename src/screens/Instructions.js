import React from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';

const Instructions = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        //backgroundColor: "green",
      }}>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
          //alignItems: "center",
          backgroundColor: 'white',
          margin: 40,
          marginTop: 50,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: 'grey',
        }}>
        <Text
          style={{
            margin: 10,
            marginTop: 3,
            marginBottom: 5,
            color: '#1776BA',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Sign in to your account or Create an Account if you are a new user
        </Text>
        <View
          style={{
            margin: 10,
            marginTop: 3,
            marginBottom: 5,
            borderBottomWidth: 2,
            borderStyle: 'dotted',
            borderColor: '#1776BA',
          }}></View>
        <Text
          style={{
            margin: 10,
            marginBottom: 5,
            marginTop: 3,
            color: '#1776BA',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Select an abaya to customize it or start customizing your abaya from
          scratch
        </Text>
        <View
          style={{
            margin: 10,
            marginTop: 3,
            marginBottom: 5,
            borderBottomWidth: 2,
            borderStyle: 'dotted',
            borderColor: '#1776BA',
          }}></View>
        <Text
          style={{
            margin: 10,
            marginBottom: 5,
            marginTop: 3,
            color: '#1776BA',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Add it to the cart and follow the procedure to place your order
        </Text>
        <View
          style={{
            margin: 10,
            marginTop: 3,
            marginBottom: 5,
            borderBottomWidth: 2,
            borderStyle: 'dotted',
            borderColor: '#1776BA',
          }}></View>
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          //alignItems: "center",
          backgroundColor: '#1776BA',
          margin: 40,
          marginTop: -15,
          borderWidth: 0.5,
          borderRadius: 10,
        }}>
        <Text
          style={{
            margin: 10,
            marginTop: 3,
            marginBottom: 5,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Once your order is placed the admin will pass your order to the tailor
          to stitch it accordingly
        </Text>
        <View
          style={{
            margin: 10,
            marginTop: 3,
            marginBottom: 5,
            borderBottomWidth: 2,
            borderStyle: 'dotted',
            borderColor: 'white',
          }}></View>
        <Text
          style={{
            margin: 10,
            marginBottom: 5,
            marginTop: 3,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Once your abaya is stitched the admin will let you know
        </Text>
        <View
          style={{
            margin: 10,
            marginTop: 3,
            marginBottom: 5,
            borderBottomWidth: 2,
            borderStyle: 'dotted',
            borderColor: 'white',
          }}></View>
        <Text
          style={{
            margin: 10,
            marginBottom: 5,
            marginTop: 3,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          You can select an abaya and can also use the AR feature to apply that
          abaya on your picture
        </Text>
        <View
          style={{
            margin: 10,
            marginTop: 3,
            marginBottom: 5,
            borderBottomWidth: 2,
            borderStyle: 'dotted',
            borderColor: 'white',
          }}></View>
        <Text
          style={{
            margin: 10,
            marginBottom: 5,
            marginTop: 3,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Payment will be on delivery
        </Text>
        <View
          style={{
            margin: 10,
            marginTop: 3,
            marginBottom: 5,
            borderBottomWidth: 2,
            borderStyle: 'dotted',
            borderColor: 'white',
          }}></View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
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
          }}
          onPress={() => navigation.navigate('Options')}>
          <Text
            style={{
              color: '#1776BA',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Got It!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Instructions;
