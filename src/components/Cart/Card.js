import React, {useContext, useRef, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {CartContext} from '../../Context/Cart-context';
import QuantityButton from '../Details/QuantityButton';

function Card({url, title, price, Value, ID, onPress, scheme, length, width}) {
  const [Quantity, setQuantity] = useState(Value);
  const CartCon = useContext(CartContext);

  const Qt = useRef(Value);

  const QuantityAdd = () => {
    setQuantity(prev => prev + 1);
    Qt.current = Qt.current + 1;
    CartCon.updateQuantity(ID, Qt.current);
    onPress();
  };

  const QuantitySub = () => {
    setQuantity(prev => prev - 1);
    Qt.current = Qt.current - 1;
    Qt.current != 0
      ? (CartCon.updateQuantity(ID, Qt.current), onPress())
      : (CartCon.removeCart(ID), onPress(ID));
  };
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
            style={{color: scheme == 'dark' ? 'white' : 'black', fontSize: 17}}>
            {title}
          </Text>
          <Text
            style={{
              color: scheme == 'dark' ? 'white' : 'black',
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            {price * Quantity}Rs/-
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '60%',
            }}>
            <Text
              style={{
                color: scheme == 'dark' ? 'white' : 'black',
                fontSize: 17,
              }}>
              length= {length}
            </Text>
            <Text
              style={{
                color: scheme == 'dark' ? 'white' : 'black',
                fontSize: 17,
              }}>
              width= {width}
            </Text>
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <QuantityButton
            size={15}
            Qunatity={Quantity}
            show={true}
            Add={QuantityAdd}
            Minus={QuantitySub}
            scheme={scheme}
          />
        </View>
      </View>
    </View>
  );
}

export default Card;
