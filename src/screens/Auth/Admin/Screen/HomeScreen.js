import React, {useContext, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';

import {ActivityIndicator} from 'react-native-paper';
import colors from '../../../../config/colors';
import {AuthContext} from '../../../../Context/AuthContext';
import Axios from '../../../../Axios';
import {Card} from '../../../../components/Cards';
const {height} = Dimensions.get('window');

const ProductScreen = ({navigation}) => {
  const [Loading, setLoading] = useState(false);
  const isfocused = useIsFocused();
  const ContxAuth = useContext(AuthContext);
  const token = ContxAuth.token;
  const [ApiData, setApiData] = useState();

  React.useEffect(() => {
    getData();
  }, [isfocused]);

  const getData = async () => {
    setLoading(false);

    try {
      const {data} = await Axios(`/product/fetch`, {
        method: 'GET',
        headers: {
          authorization: token,
        },
      });

      setApiData(data);
      setLoading(false);
    } catch (e) {
      Alert.alert(`${e.response.data.message}` || 'Something went wrong');
      setLoading(false);
    }
  };

  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  async function CartActions(id) {
    try {
      const {data} = await Axios.delete(`/product/delete/${id}`, {
        headers: {
          authorization: token,
        },
      });

      getData();
      setLoading(false);
    } catch (e) {
      Alert.alert(`${e.response.data.message}` || 'Something went wrong');
      setLoading(false);
    }
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.mainContainer}>
          <View style={{marginTop: 20, width: '100%', paddingBottom: '40%'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ApiData}
              renderItem={({item}) => {
                // console.log(item);
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
                      admin={true}
                      product={Pro}
                      // stock={item.stock}
                      ID={item._id}
                      onPress={() => navigation.navigate('Detail', item)}
                      CartAction={() => CartActions(item._id)}
                    />
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
});
export default ProductScreen;
