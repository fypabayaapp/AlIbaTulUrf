import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import QuantityButton from '../../components/Details/QuantityButton';
import colors from '../../config/colors';
import {AuthContext} from '../../Context/AuthContext';
import {CartContext} from '../../Context/Cart-context';
import {FavContext} from '../../Context/fav-context';
import {useIsFocused} from '@react-navigation/native';
import {set} from 'react-native-reanimated';
import Axios from '../../Axios';

const DetailsScreen = ({navigation, route}) => {
  const product = route.params;
  const isfocused = useIsFocused();
  const CartCon = useContext(CartContext);
  const Items = CartCon.ids;
  const [Quantity, SetQuantity] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [UpdateModel, setUpdate] = useState(false);

  const [length, setlength] = useState();
  const [width, setWidth] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();

  console.log('Details');

  const ContxAuth = useContext(AuthContext);
  const mode = ContxAuth.mode == 'admin';
  const ID = product._id;
  const postedBy = product.postedBy;
  const token = ContxAuth.token;

  console.log(product.length);
  useEffect(() => {
    setlength(product.length);
    setWidth(product.width);
    setPrice(product.price);
    setStock(product.stock);
  }, [isfocused]);

  function CartActions() {
    //we are checking for the array of object for our id
    const found = Items.some(el => el._id === ID);
    found
      ? CartCon.updateQuantity(product._id, Quantity, length, width)
      : CartCon.addCart(product, Quantity, length, width);
    Alert.alert('Added Item', 'Item Added Successfully.');
    // navigation.navigate('CartScreen');
  }

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

  const SaveCart = () => {
    setModalVisible(!modalVisible);
    console.log(length, width);
  };

  async function AdminUpdate() {
    setUpdate(!UpdateModel);
    try {
      console.log(ID);
      const {data} = await Axios({
        method: 'PUT',
        url: `/admin/update/product/${ID}`,
        data: {stock, price},
        headers: {authorization: token},
      });
      Alert.alert('Alert', `${data?.message}`);
    } catch (e) {
      Alert.alert(
        'Kindly input correct values',
        `${e?.response?.data?.message}`,
      );
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar backgroundColor={colors.background} />
      <View style={{height: 400, backgroundColor: 'white'}}>
        <ImageBackground
          resizeMode="contain"
          source={{uri: product.image}}
          style={{
            height: 280,
            top: 50,
          }}>
          {/* Render  Header */}
          <View style={style.header}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(mode ? 'AdminProducts' : 'Home')
              }>
              <Icon name="arrow-left" size={28} color={colors.primary} />
            </TouchableOpacity>
            {!mode && (
              <TouchableOpacity
                style={{width: '15%', flexDirection: 'row'}}
                onPress={() => navigation.navigate('Cart')}>
                <Icon name="cart" size={28} color={colors.primary} />
                <Text
                  style={{
                    backgroundColor: '#FF6347',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    height: 18,
                    width: '20%',
                    borderRadius: 7,
                    borderWidth: 0.15,
                    elevation: 18,
                    shadowColor: 'black',
                    shadowOpacity: 15,
                    shadowRadius: 5,
                  }}>
                  {Items.length}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>

        <View style={style.detailsContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{fontSize: 15, color: colors.dark, fontWeight: 'bold'}}>
              {product.name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Icon1 name="money" color={colors.primary} size={20} />
            <Text
              style={{
                fontSize: 14,
                color: colors.dark,
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              {product.price} RS/-
            </Text>
          </View>

          {/* Render location and icon */}
          <View style={{marginTop: 5, flexDirection: 'row'}}>
            <Icon name="format-color-fill" color={colors.primary} size={20} />
            <Text style={{fontSize: 14, color: colors.grey, marginLeft: 5}}>
              {product.color}
            </Text>
          </View>
          <View style={{marginTop: 5, flexDirection: 'row'}}>
            <Icon name="diamond-stone" color={colors.primary} size={20} />
            <Text style={{fontSize: 14, color: colors.grey, marginLeft: 5}}>
              {!product.pearls ? 'without pearls' : 'With pearls'}
            </Text>
          </View>
        </View>
      </View>

      {/* Comment container */}
      <ScrollView
        contentContainerStyle={{
          marginTop: 80,
          justifyContent: 'space-between',
          // flex: 1,
          paddingBottom: '20%',
        }}>
        <View>
          {/* Render user image , name and date */}
          <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
            <Image
              source={{uri: postedBy.avatar}}
              style={{height: 40, width: 40, borderRadius: 20}}
            />
            <View style={{flex: 1, paddingLeft: 10}}>
              <Text
                style={{color: colors.dark, fontSize: 12, fontWeight: 'bold'}}>
                {postedBy.username}
              </Text>
              <Text
                style={{
                  color: colors.grey,
                  fontSize: 11,
                  fontWeight: 'bold',
                  marginTop: 2,
                }}>
                Owner
              </Text>
            </View>
            {/* <Text style={{color: colors.grey, fontSize: 12}}>May 25, 2020</Text> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: '5%',
            }}>
            <View>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Icon
                  name="arrow-expand-vertical"
                  color={colors.primary}
                  size={20}
                />
                <Text style={{fontSize: 14, color: colors.grey, marginLeft: 5}}>
                  {product.length}
                </Text>
              </View>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Icon
                  name="arrow-expand-horizontal"
                  color={colors.primary}
                  size={20}
                />
                <Text style={{fontSize: 14, color: colors.grey, marginLeft: 5}}>
                  {product.width}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                mode ? setUpdate(true) : setModalVisible(true);
              }}>
              {mode && (
                <Text style={{color: 'black', fontSize: 15}}>
                  Stock={stock}
                </Text>
              )}
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  backgroundColor: colors.primary,
                  borderRadius: 28,
                  padding: '2%',
                }}>
                {mode ? 'Customize Product' : 'Custom Size'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={style.comment}>{product.discription}</Text>
        </View>
      </ScrollView>

      {/* Render footer */}
      {!mode && !product?.stock == 0 && (
        <View style={style.footer}>
          <View
            style={{
              width: '45%',
              height: '100%',
              borderRadius: 15,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <QuantityButton
              size={16}
              Qunatity={Quantity}
              show={true}
              Add={() => SetQuantity(prev => prev + 1)}
              Minus={() => SetQuantity(prev => prev - 1)}
            />
          </View>
          {Quantity > 0 && (
            <TouchableOpacity
              style={style.btn}
              onPress={() => {
                CartActions();
              }}>
              <Text style={{color: colors.white, fontWeight: 'bold'}}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

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
            placeholder="Your length"
            placeholderTextColor={'grey'}
            style={[style.input, {width: '90%'}]}
            value={length}
            keyboardType={'number-pad'}
            onChangeText={value => setlength(value)}
          />
          <TextInput
            placeholder="Your width"
            placeholderTextColor={'grey'}
            style={[style.input, {width: '90%'}]}
            value={width}
            keyboardType={'number-pad'}
            onChangeText={value => setWidth(value)}
          />
          <TouchableOpacity
            onPress={SaveCart}
            style={[
              style.Button,
              {
                borderColor: colors.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                style.textButton,
                {
                  color: colors.primary,
                },
              ]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={UpdateModel}
        onRequestClose={() => {
          setUpdate(!UpdateModel);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50%',
          }}>
          <TextInput
            placeholder="Price"
            placeholderTextColor={'grey'}
            style={[style.input, {width: '90%'}]}
            value={price}
            keyboardType={'number-pad'}
            onChangeText={value => setPrice(value)}
          />
          <TextInput
            placeholder="Stock"
            placeholderTextColor={'grey'}
            style={[style.input, {width: '90%'}]}
            value={stock}
            keyboardType={'number-pad'}
            onChangeText={value => setStock(value)}
          />

          <TouchableOpacity
            onPress={() => AdminUpdate()}
            style={[
              style.Button,
              {
                borderColor: colors.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                style.textButton,
                {
                  color: colors.primary,
                },
              ]}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  detailsContainer: {
    height: 170,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    flex: 1,
    bottom: -60,
    borderRadius: 18,
    elevation: 10,
    padding: 20,
    justifyContent: 'center',
  },
  comment: {
    marginTop: 10,
    fontSize: 12.5,
    color: colors.dark,
    lineHeight: 20,
    marginHorizontal: 20,
  },
  footer: {
    height: 100,
    backgroundColor: colors.light,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconCon: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  btn: {
    backgroundColor: colors.primary,
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
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
});
export default DetailsScreen;
