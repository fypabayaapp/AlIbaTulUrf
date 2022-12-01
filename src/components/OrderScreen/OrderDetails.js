import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';
import CartStats from './CartStats';
import DetailOrderCard from './DetailOrderCard';

function OrderDetails({
  OrderID,
  contact,
  Address,
  Date,
  category,
  onPress,
  Abaya,
}) {
  return (
    <ScrollView style={{flex: 1, paddingTop: '10%'}}>
      <View
        style={[
          styles.BackGroundView,
          {backgroundColor: category ? '#0e4871' : '#F28944'},
        ]}>
        <View style={{width: '85%', paddingTop: 40}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: category ? colors.secondary : 'white',
                fontWeight: 'bold',
                fontSize: 25,
              }}>
              Your Order Details
            </Text>
            <TouchableOpacity onPress={onPress}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Order By:
          </Text>
          <Text
            style={{
              color: category ? 'white' : 'black',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            {Date}
          </Text>

          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: 5,
            }}>
            OrderID#{OrderID}
          </Text>
          <View
            style={[
              styles.cartContent,
              {backgroundColor: category ? colors.primary : '#f2995f'},
            ]}>
            <View style={styles.shadowBackground}>
              <Text
                style={{
                  marginTop: 15,
                  fontSize: 18,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                OrderItems
              </Text>
            </View>
            <View style={{width: '95%', marginTop: 20, marginBottom: 15}}>
              {Abaya?.map(data => {
                const product = data.details;
                return (
                  <DetailOrderCard
                    length={data.length}
                    width={data.width}
                    Quantity={data.quantity}
                    price={product.price}
                    title={product.name}
                    scheme={'light'}
                    url={product.image}
                  />
                );
              })}
            </View>
          </View>

          <View
            style={[
              styles.cartContent,
              {backgroundColor: category ? colors.primary : '#f2995f'},
            ]}>
            <View style={styles.shadowBackground}>
              <Text
                style={{
                  paddingBottom: 5,
                  marginTop: 15,
                  fontSize: 18,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Your Shipping Details
              </Text>
            </View>
            <View
              style={{
                width: '95%',
                paddingBottom: 10,
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 14, color: 'white'}}>
                Shipping Address:
                <Text style={styles.InsideText}> {Address}</Text>
                {'\n'}
                City: <Text style={styles.InsideText}> Lahore{'\n'}</Text>
                Phone number: <Text style={styles.InsideText}> {contact}</Text>
                {' \n'}
                Zip code: <Text style={styles.InsideText}> 54570 </Text>
                {'\n'}
                Country calling code:{' '}
                <Text style={styles.InsideText}> +92</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default OrderDetails;

const styles = StyleSheet.create({
  // EE9E6A
  BackGroundView: {
    // backgroundColor: '#F28944',
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    marginTop: '15%',
    paddingBottom: '20%',

    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 21,
    elevation: 4,

    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  cartContent: {
    // backgroundColor: '#E5874B',
    // backgroundColor: colors.primary,
    marginTop: 20,
    borderColor: 'rgba(255,255,255,0.3)',

    width: '100%',
    borderRadius: 40,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    // opacity: 0.4,
  },

  InsideText: {
    color: 'black',
    fontWeight: 'normal',
  },
  shadowBackground: {
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    elevation: 2,
    borderRadius: 40,
    width: '80%',
    height: 55,
  },
});
