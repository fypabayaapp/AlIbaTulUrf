import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Card} from '../../components/Cards';
import colors from '../../config/colors';
import {CartContext} from '../../Context/Cart-context';
import {AuthContext} from '../../Context/AuthContext';
import Axios from '../../Axios';
import {ActivityIndicator} from 'react-native-paper';
const {height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const isfocused = useIsFocused();
  const CartCon = useContext(CartContext);
  const ContxAuth = useContext(AuthContext);
  const token = ContxAuth.token;

  const Items = CartCon.ids;
  const User = ContxAuth.Data;
  const name = User.username;
  const avatar = User.avatar;

  const [Loading, setLoading] = useState(false);
  const [issearching, setIsSearching] = useState(false);
  const [ApiData, setApiData] = useState();
  const [search, setSearch] = useState();
  const Quantity = 1;
  React.useEffect(() => {
    getData();
  }, [isfocused]);

  function CartActions(item) {
    //we are checking for the array of object for our id
    const found = Items.some(el => el._id === item._id);
    found
      ? CartCon.updateQuantity(item, Quantity, item.length, item.width)
      : CartCon.addCart(item, Quantity, item.length, item.width);
    Alert.alert('Added Item', 'Item Added Successfully.');
    // navigation.navigate('CartScreen');
  }

  const getData = async () => {
    setIsSearching(false);
    setLoading(true);
    try {
      const {data} = await Axios(`/product/fetch`, {
        method: 'GET',
        headers: {
          authorization: token,
        },
      });

      if (!data) {
        throw Error('INTERNET IS SLOW');
      }
      setApiData(data);
      setLoading(false);
    } catch (e) {
      console.log('ERROR OF CATCH', e.message);

      Alert.alert(`${e.response.data.message}`);
      setLoading(false);
    }
  };
  const searchData = async () => {
    setIsSearching(true);
    setApiData();
    try {
      const {data} = await Axios(`/product/query?color=${search}`, {
        method: 'GET',
        headers: {
          authorization: token,
        },
      });
      setApiData(data);
      // console.log(data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  if (Loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      <View style={style.header}>
        <Icon
          color={'white'}
          name="sort-variant"
          size={28}
          onPress={navigation.toggleDrawer}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          {name}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('PROFILE')}>
          <Image
            source={{uri: avatar}}
            // {uri: avatar}}
            style={{height: 50, width: 50, borderRadius: 25}}
          />
        </TouchableOpacity>
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={style.mainContainer}>
        <View style={style.searchInputContainer}>
          <Icon name="magnify" size={24} color={colors.grey} />
          <TextInput
            placeholderTextColor={colors.grey}
            placeholder="Search your abaya"
            style={{flex: 1, color: 'black'}}
            onChangeText={value => setSearch(value)}
          />
          <TouchableOpacity onPress={searchData}>
            <Icon name="sort-ascending" size={24} color={colors.grey} />
          </TouchableOpacity>
        </View>
        {issearching && (
          <TouchableOpacity
            style={{alignSelf: 'center', paddingTop: '5%'}}
            onPress={() => getData()}>
            <Icon
              name="sticker-minus-outline"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
        <View style={{marginTop: 20, width: '100%', paddingBottom: '40%'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ApiData}
            renderItem={({item}) => {
              const Pro = {
                image: item.image,
                name: item.name,
                price: item.price,
                length: item.length,
                width: item.width,
              };

              return (
                <View style={{width: '100%'}}>
                  <Card
                    product={Pro}
                    ID={item._id}
                    stock={item.stock}
                    onPress={() => navigation.navigate('Detail', item)}
                    CartAction={() => CartActions(item)}
                    ARaction={() => navigation.navigate('ARviews', item)}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
      {/* </ScrollView> */}
      <TouchableOpacity
        style={style.btn}
        onPress={() => navigation.navigate('Cart')}

        // onPress={() => {
        //   Path == 'Product' ? CartActions() : call(args).catch(console.error);
        // }}
      >
        <Icon name="cart" size={28} color={'white'} />
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
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  btn: {
    // flex: 1,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    // right: 5,
    width: 80,
    alignSelf: 'center',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  searchInputContainer: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  categoryBtnName: {
    color: colors.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
});
export default HomeScreen;
