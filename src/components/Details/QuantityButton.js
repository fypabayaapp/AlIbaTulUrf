import React, {useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';

function QuantityButton({Add, Minus, size, Qunatity, show, scheme}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {Qunatity != 0 && (
        <TouchableOpacity style={styles.ButtonContainer} onPress={Minus}>
          <AntDesign name="minus" color={'white'} size={size ? size : 16} />
        </TouchableOpacity>
      )}
      {show ? (
        <Text
          style={{
            alignItems: 'center',
            marginHorizontal: 20,
            fontWeight: 'bold',
            color: scheme == 'dark' ? 'white' : 'black',
          }}>
          {Qunatity}
        </Text>
      ) : (
        <View style={{marginHorizontal: 3}} />
      )}
      <TouchableOpacity style={[styles.ButtonContainer]} onPress={Add}>
        <AntDesign name="plus" color={'white'} size={size ? size : 16} />
      </TouchableOpacity>
    </View>
  );
}

export default QuantityButton;

const styles = StyleSheet.create({
  ButtonContainer: {
    backgroundColor: '#a3440dc4',
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});
