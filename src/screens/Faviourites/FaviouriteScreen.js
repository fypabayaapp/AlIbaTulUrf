import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from '../../components/Cards';
import {useIsFocused} from '@react-navigation/native';
import {FavContext} from '../../Context/fav-context';

import {ActivityIndicator} from 'react-native-paper';
import colors from '../../config/colors';
import {AuthContext} from '../../Context/AuthContext';
import Axios from '../../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height} = Dimensions.get('window');

export default function FaviouriteScreen({navigation}) {
  const faviourite = useContext(FavContext);
  const Auth = useContext(AuthContext);
  const Fav = faviourite.ids;
  const [Faviourite, setFaviourite] = useState([]);
  const [showData, setShowData] = useState([]);
  const [ApiData, setApiData] = useState();
  const isfocus = useIsFocused();
  const [Loading, setLoading] = useState(false);

  const token = Auth.token;

  const getData = async () => {
    setLoading(true);

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
      Alert.alert(`${e?.response?.data?.message}` || ` Something went wrong`);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    getData();
    if (Fav) {
      setFaviourite([]);
      for (const key in Fav) {
        getFavData(Fav[key]);
      }
    }
    setShowData(Faviourite);
    setLoading(false);
  }, [isfocus]);

  async function getFavData(ID) {
    const fav = await AsyncStorage.getItem('Fav');
    await ApiData.map(data => {
      if (data._id == ID) {
        Faviourite.push(data);
      }
    });
  }

  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
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
          Faviourites
        </Text>
      </View>
      <View style={style.mainContainer}>
        <View style={{marginTop: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={showData}
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
                    onPress={() => navigation.navigate('Detail', item)}
                    CartAction={() => CartActions(item)}
                  />
                </View>
              );
            }}
          />
        </View>
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
  searchInputContainer: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardDetailsContainer: {
    height: 120,
    backgroundColor: colors.white,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: colors.background,
    borderRadius: 20,
  },
});
