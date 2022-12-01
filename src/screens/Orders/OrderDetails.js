import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import axios from '../../Axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {FavContext} from '../../Context/fav-context';
import {ActivityIndicator} from 'react-native-paper';
import colors from '../../config/colors';
import {AuthContext} from '../../Context/AuthContext';
import Card from '../../components/Orders/Card';
import OrderDetails from '../../components/OrderScreen/OrderDetails';
import OrderCard from '../../components/OrderScreen/OrderCard';
const {height} = Dimensions.get('window');

export default function ({navigation}) {
  const Auth = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  // const Date = '24Nov,2022';

  const [ApiData, setApiData] = useState();
  const [ShowData, setShowData] = useState([]);
  const isfocus = useIsFocused();
  const [Loading, setLoading] = useState(false);
  const token = Auth.token;

  useEffect(() => {
    async function GetOrders() {
      setLoading(true);
      try {
        const {data} = await axios({
          method: 'GET',
          url: '/order/get',
          headers: {authorization: token},
        });
        setLoading(false);

        setApiData(data);
      } catch (e) {
        setLoading(false);

        Alert.alert(`${e?.response?.data?.message}` || ` Something went wrong`);
      }
      setLoading(false);
    }
    GetOrders();
  }, [isfocus]);

  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  function OrderLists() {
    const data = ShowData;
    console.log('From Model', data);
    const abaya = data?.abayas;
    const Customer = data?.customer;
    const shipping = data?.shipping_address;
    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{flex: 1}}>
            <OrderDetails
              OrderID={data._id}
              Date={Customer?.username}
              Abaya={abaya}
              contact={Customer?.contact}
              Address={shipping}
              onPress={() => {
                setModalVisible(false);
              }}
              category={false}
            />

            {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.touchArea} />
          </TouchableWithoutFeedback> */}
          </View>
        </Modal>
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, color: colors.primary}}>
      <View style={style.header}>
        <Icon
          name="sort-variant"
          size={28}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Order History
        </Text>
      </View>

      <View style={style.mainContainer}>
        {ApiData?.map(data => {
          return (
            <OrderCard
              title={data.customer.username}
              order={data._id}
              // price={ApiData.length}
              date={data.status}
              onPress={() => {
                setShowData(data), setModalVisible(true);
              }}
            />
          );
        })}
        <OrderLists />
        {/* <View style={{marginTop: 5, paddingBottom: '40%'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ApiData}
            renderItem={({item}) => {
              const product = item.abayas[0].details;
              // 
              return (
                <Card
                  ID={item._id}
                  price={product.price}
                  qty={item.abayas[0].quantity}
                  title={product.name}
                  url={product.image}
                />
              );
            }}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
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
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
  categoryTextSelected: {
    color: colors.primary,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: '#fc5c65',
  },
  touchArea: {
    height: '30%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
