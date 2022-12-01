import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from '../../Axios';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Card from '../../components/Cart/Card';
import CartStats from '../../components/Cart/CartStats';
import colors from '../../config/colors';
import {CartContext} from '../../Context/Cart-context';
import {AuthContext} from '../../Context/AuthContext';

const {height} = Dimensions.get('window');

export default function CartScreen({navigation}) {
  const CartCon = useContext(CartContext);
  const Auth = useContext(AuthContext);
  const isfocus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAdd] = useState();

  const [Cart, setCart] = useState(CartCon.ids);
  const [Quantity, setQuantity] = useState(CartCon.Qty);

  const [length, setlength] = useState(CartCon.length);
  const [width, setwidth] = useState(CartCon.width);

  const [Buying, setBuying] = useState(true);
  const [SubTotalValue, setSubTotalValue] = useState(0);
  const mode = Auth.mode == 'admin';

  console.log(' cart is ==> ', length, width);
  const token = Auth.token;
  useEffect(() => {
    setCart(CartCon.ids);
    // console.log(' cart is here ==> ', Cart.length);
    setlength(CartCon.length);
    setwidth(CartCon.width);
    setBuying(true);
    setQuantity(CartCon.Qty);
    CalculateSubTotal();
  }, [isfocus]);

  useEffect(() => {
    const backAction = () => {
      mode ? navigation.goBack() : navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  function CalculateSubTotal() {
    const Quantity = CartCon.Qty;
    const Ids = CartCon.ids;
    setSubTotalValue(0);

    for (const key in Quantity) {
      const total = Ids[key]?.price * Number(Quantity[key]);
      setSubTotalValue(prev => prev + total);
    }
  }
  const saveCart = async () => {
    const cart = [];
    Cart.map((c, i) => {
      cart.push({
        details: c._id,
        quantity: Quantity[i],
        length: length[i],
        width: width[i],
      });
    });
    try {
      const {data} = await axios({
        method: 'POST',
        url: '/order/add',
        data: {cart, address},
        headers: {authorization: token},
      });
      Alert.alert('Alert', `${data?.message}`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            CartCon.resetCart(), setBuying(false);
          },
        },
      ]);
    } catch (e) {
      Alert.alert(
        'Kindly input correct values',
        `${e?.response?.data?.message}`,
      );
    }
  };

  return Cart.length != 0 && Buying ? (
    <SafeAreaView style={{flex: 1, color: colors.primary}}>
      <View style={styles.header}>
        <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Cart Screen
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={{height: '45%'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Cart}
            renderItem={({item, index}) => {
              const qty = Quantity[index];
              return (
                <Card
                  ID={item._id}
                  price={item.price}
                  title={item.name}
                  url={item.image}
                  length={length[index]}
                  width={width[index]}
                  Value={qty}
                  onPress={() => CalculateSubTotal()}
                />
              );
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'lightgrey',
          borderTopEndRadius: 45,
          borderTopStartRadius: 45,
        }}>
        <CartStats
          Subtotal={SubTotalValue}
          DeliveryCharges={200}
          saveCart={() => setModalVisible(true)}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40%',
          }}>
          <TextInput
            placeholder="Your Shipping Address"
            placeholderTextColor={'grey'}
            multiline={true}
            style={[styles.input, {width: '90%'}]}
            value={address}
            onChangeText={value => setAdd(value)}
          />
          <TouchableOpacity
            onPress={saveCart}
            style={[
              styles.Button,
              {
                borderColor: colors.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textButton,
                {
                  color: colors.primary,
                },
              ]}>
              Done
            </Text>
          </TouchableOpacity>
          {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.touchArea} />
          </TouchableWithoutFeedback> */}
        </View>
      </Modal>
    </SafeAreaView>
  ) : (
    <View
      style={{
        flex: 1,
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Ionicons name="trash-bin" size={55} color="#FF6347" />
      <Text
        style={{
          color: '#FF6347',
          fontSize: 35,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        NO ITEM IN CART
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    // height: ,
    width: '80%',
    marginTop: 18,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
  },
  Button: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: height,
  },
});
