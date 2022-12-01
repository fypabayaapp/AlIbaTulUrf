import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors';

function OrderCard({order, title, onPress, price, date}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={style.card}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 17,
            // marginTop: 10,
            // height: 30,
          }}>
          {title}
          {'\n'}
          {/* {order.name} */}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // marginTop: 5,
          }}>
          <Text style={{fontSize: 17, color: 'grey'}}>
            <Text style={{fontWeight: '600'}}>#{order}</Text>
            {'\n'}
            {/* {price} {'\n'} */}
            <Text style={{fontSize: 14, color: 'grey'}}>{date}</Text>
          </Text>
          {/* <View
            style={{
              height: 25,
              width: 70,
              backgroundColor: colors.green,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}> */}
          {/* <Text
              style={{
                fontSize: 18,
                color: 'green',
                fontWeight: 'bold',
              }}>
              Details
            </Text> */}
          {/* </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default OrderCard;

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
  categoryTextSelected: {
    color: '#fc5c65',
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: '#fc5c65',
  },
  card: {
    // height: '40%',
    // paddingTop: '2%',
    marginTop: '2%',
    backgroundColor: 'lightgrey',
    width: '100%',
    marginHorizontal: 2,
    borderRadius: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: colors.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: colors.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: '#fc5c65',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
