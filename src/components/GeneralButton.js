import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function GeneralButton({onPress, title}) {
  return (
    <TouchableOpacity
      style={{
        margin: 10,
        paddingVertical: 10,
        backgroundColor: '#1776BA',
        borderRadius: 10,
        width: 200,
        borderWidth: 0.5,
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
