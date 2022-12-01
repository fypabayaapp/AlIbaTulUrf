import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../../../config/colors';
import Card from '../../../../components/Orders/Card';
import {ActivityIndicator} from 'react-native-paper';
import Axios from '../../../../Axios';
import {AuthContext} from '../../../../Context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import OrderDetails from '../../../../components/OrderScreen/OrderDetails';
const {height} = Dimensions.get('window');

export default function OrderApproval({navigation}) {
  const Auth = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [ShowData, setShowData] = useState([]);

  const [catergoryIndex, setCategoryIndex] = React.useState(0);
  const categories = ['Pending', 'Approved', 'Custom', 'Rejected'];
  const [ApiData, setApiData] = useState();
  const isfocus = useIsFocused();
  const [Loading, setLoading] = useState(false);
  const token = Auth.token;

  useEffect(() => {
    GetOrders();
  }, [catergoryIndex]);

  async function GetOrders() {
    setLoading(true);
    const status =
      catergoryIndex == 0
        ? 'pending'
        : catergoryIndex == 1
        ? 'approved'
        : catergoryIndex == 2
        ? 'custom'
        : 'rejected';
    try {
      setApiData();

      const {data} = await Axios({
        method: 'GET',
        url: `/order/get/responded?status=${status}`,
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
  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const Respond = async (id, descision) => {
    try {
      setLoading(true);
      const {data} = await Axios({
        method: 'PUT',
        url: `/order/respond/${id}`,
        headers: {authorization: token},
        data: {response: descision},
      });
      setLoading(false);
      Alert.alert(`${data.message}`);
      GetOrders();
    } catch (e) {
      Alert.alert(`${e?.response?.data?.message}` || ` Something went wrong`);
      setLoading(false);
    }
  };
  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}>
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  function OrderLists() {
    const data = ShowData;
    console.log('From Model', data);
    const abaya = data.abayas;
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
              OrderID={data?._id}
              Date={Customer?.username}
              Abaya={abaya}
              contact={Customer?.contact}
              Address={shipping}
              onPress={() => {
                setModalVisible(false);
              }}
              category={true}
            />
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      <View style={style.header}>
        <Icon name="backburger" size={28} onPress={() => navigation.goBack()} />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Products
        </Text>
      </View>

      <View style={style.mainContainer}>
        <CategoryList />

        <View style={{marginTop: 5, paddingBottom: '40%'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ApiData}
            renderItem={({item}) => {
              const product = item.abayas[0].details;

              return (
                <TouchableOpacity
                  onPress={() => {
                    setShowData(item), setModalVisible(true);
                  }}>
                  <Card
                    ID={item._id}
                    status={item?.status}
                    price={product?.price}
                    qty={item.abayas[0].quantity}
                    title={item?.customer?.username}
                    url={product?.image}
                    CartReject={() => Respond(item._id, false)}
                    CartAction={() => Respond(item._id, true)}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <OrderLists />
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
});
