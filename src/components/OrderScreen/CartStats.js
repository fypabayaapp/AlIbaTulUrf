import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';

function CartStats({Subtotal, Discount, DeliveryCharges}) {
  const Total = Subtotal + DeliveryCharges - Discount;

  return (
    <View style={{alignItems: 'center'}}>
      <View style={{width: '85%', marginTop: 35}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.TextHeading}>Subtotal</Text>
          <Text style={styles.Text}>${Subtotal}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.TextHeading}>Discount</Text>
          <Text style={styles.Text}>-${Discount}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <Text style={styles.TextHeading}>Delivery</Text>
          <Text style={styles.Text}>${DeliveryCharges}</Text>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderStyle: 'dashed',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <Text style={styles.TextHeading}>Total</Text>
            <Text style={styles.Text}> {Total}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CartStats;

const styles = StyleSheet.create({
  BottomBar: {
    backgroundColor: colors.black,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
    width: '100%',
  },
  BottomText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    margin: 5,
  },
  CalculationView: {
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  RedCal: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'red',
  },
  TextHeading: {
    color: 'white',
    fontWeight: 'bold',
  },
  Text: {color: 'white'},
});
