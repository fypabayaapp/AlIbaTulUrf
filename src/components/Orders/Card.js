import React, {useContext, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CartContext} from '../../Context/Cart-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';

function Card({url, title, price, qty, ID, CartAction, CartReject, status}) {
  const [Quantity, setQuantity] = useState(qty);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
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
          <Text style={{color: 'black', fontSize: 17}}>{title}'s Order</Text>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            {price * Quantity}Rs/-
          </Text>

          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            {Quantity}-qty
          </Text>
        </View>

        {/* <View style={{marginVertical: 10, marginHorizontal: 10}}></View> */}
        {/* <View style={{width: '100%', alignItems: 'center'}}>
          <QuantityButton
            size={15}
            Qunatity={Quantity}
            show={true}
            Add={QuantityAdd}
            Minus={QuantitySub}
            scheme={scheme}
          />
        </View> */}
      </View>
      {status == 'pending' && (
        <>
          <TouchableOpacity style={style.iconAdd} onPress={CartAction}>
            <Icon name={'sticker-check-outline'} size={30} color={'green'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.iconAdd, {top: '10%'}]}
            onPress={CartReject}>
            <Icon name={'sticker-check-outline'} size={30} color={'red'} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default Card;
const style = StyleSheet.create({
  iconAdd: {
    // backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    right: 12,
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 15,
  },
});
