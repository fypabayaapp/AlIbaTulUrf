import React, {useContext, useRef, useState} from 'react';
import {Image, Text, View} from 'react-native';

function DetailOrderCard({url, title, price, Quantity, scheme, length, width}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: scheme == 'dark' ? 'black' : 'white',
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginVertical: 8,
      }}>
      {/* Image tag View */}
      <Image
        // source={require('../../assets/trans01.png')}
        source={{uri: url}}
        style={{
          width: 90,
          height: 90,
          backgroundColor: 'black',
          borderRadius: 15,
        }}
        resizeMode={'cover'}
      />
      {/* //// */}
      <View style={{width: '100%'}}>
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Text
            style={{color: scheme == 'dark' ? 'white' : 'black', fontSize: 16}}>
            {title}
          </Text>
          <Text
            style={{
              color: scheme == 'dark' ? 'white' : 'black',
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            <Text style={{fontSize: 12}}>PKR-</Text>
            {price}
          </Text>
          <Text
            style={{
              color: scheme == 'dark' ? 'white' : 'grey',
              fontSize: 15,
            }}>
            Qty#{Quantity}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '60%',
            }}>
            <Text
              style={{
                color: scheme == 'dark' ? 'white' : 'grey',
                fontSize: 15,
              }}>
              length={length}
            </Text>
            <Text
              style={{
                color: scheme == 'dark' ? 'white' : 'grey',
                fontSize: 15,
              }}>
              width={width}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DetailOrderCard;
