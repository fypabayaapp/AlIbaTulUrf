import React, {useContext} from 'react';
import {
  Dimensions,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import {FavContext} from '../Context/fav-context';

export const Card = ({
  admin,
  product,
  onPress,
  stock,
  ID,
  CartAction,
  ARaction,
}) => {
  const faviourite = useContext(FavContext);

  const isMealFav = faviourite?.ids.includes(ID); //Context
  // const isMealFav = ID == 2 || ID == 3 ? true : false;
  const Badge = !isMealFav ? 'heart-outline' : 'heart';
  const ColorBadge = !isMealFav ? 'white' : '#FF6347';

  const Faviourite = () => {
    if (isMealFav) {
      faviourite.removeFav(ID);
    } else {
      faviourite.addFav(ID);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.cardContainer}>
        {/* Render the card image */}
        <View style={style.cardImageContainer}>
          <Image
            source={{uri: product.image}}
            style={{
              width: '93%',
              height: '93%',
              resizeMode: 'contain',
            }}
          />
          {stock == 0 && (
            <Text
              style={{
                backgroundColor: 'red',
                color: 'white',
                fontSize: 20,
                marginBottom: '15%',
                // alignSelf: 'center',
                // bottom: 10,
                // position: 'absolute',
              }}>
              Out of stock
            </Text>
          )}
          {!admin && (
            <TouchableOpacity style={style.iconCon} onPress={Faviourite}>
              <Icon name={Badge} size={22} color={ColorBadge} />
            </TouchableOpacity>
          )}
        </View>

        {/* Render all the card details here */}
        <View style={style.cardDetailsContainer}>
          {stock != 0 && (
            <TouchableOpacity style={style.iconAdd} onPress={CartAction}>
              <Icon
                name={admin ? 'trash-can-outline' : 'plus'}
                size={22}
                color={'white'}
              />
            </TouchableOpacity>
          )}
          {!admin && (
            <TouchableOpacity
              style={{
                top: 3,
                flexDirection: 'row',
                backgroundColor: 'gold',
                width: 50,
                height: 30,
                borderRadius: 15,
                position: 'absolute',
                right: -15,
                // top: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={ARaction}>
              <Icon name={'state-machine'} size={22} color={'black'} />
              <Text style={{color: 'black', fontWeight: 'bold'}}>AR</Text>
            </TouchableOpacity>
          )}
          {/* Name and gender icon */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{fontWeight: 'bold', color: colors.dark, fontSize: 15}}>
              {product?.name}
            </Text>
          </View>

          {/* Render the age and type */}
          <Text style={{fontSize: 14, marginTop: 5, color: colors.dark}}>
            {product?.price + 'RS/-'}
          </Text>
          <Text style={{fontSize: 13, marginTop: 5, color: colors.grey}}>
            Length: {product?.length}cm
            {'\n'}
            Width: {product?.width}inches
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8%',
  },
  cardDetailsContainer: {
    height: 130,
    width: '55%',
    backgroundColor: '#ffff',
    // flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  cardImageContainer: {
    height: 160,
    width: 140,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    // colors.background,
    borderRadius: 20,
    // borderRadius: 26,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },

  iconCon: {
    backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 12,
    position: 'absolute',
    left: 5,
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 15,
  },
  iconAdd: {
    backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    right: -15,
    // top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 15,
  },
});
