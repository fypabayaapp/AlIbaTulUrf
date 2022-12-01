import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  useDrawerProgress,
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {View, Image, Text, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';
import {AuthContext} from '../Context/AuthContext';
import HomeScreen from '../screens/Products/ProductScreen';
import CartScreen from '../screens/Cart/CartScreen';
import FaviouriteScreen from '../screens/Faviourites/FaviouriteScreen';

import HelloCustomer from '../screens/HelloCustomer';
import EditProfile from '../screens/EditProfile';
import DetailsScreen from '../screens/Products/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import MessagesScreen from '../screens/Chat/MessageScreen';
import {ProfileStack} from './AdminStack.';
import CustomOrder from '../screens/Orders/CustomOrder';
import OrderDetails from '../screens/Orders/OrderDetails';
import ARScreen from '../screens/AR/ARScreen';

const Drawer = createDrawerNavigator();

const DrawerScreenContainer = ({children}) => {
  const isDrawerOpen = useDrawerStatus();

  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
      }}>
      <StatusBar
        backgroundColor={isDrawerOpen == 'open' ? colors.primary : colors.white}
        barStyle="dark-content"
      />
      {children}
    </View>
  );
};

const CustomDrawerContent = props => {
  const ContxAuth = useContext(AuthContext);
  const User = ContxAuth.Data;
  const username = User.username;
  const avatar = User.avatar;

  return (
    <DrawerContentScrollView
      style={{
        paddingVertical: 30,
      }}>
      <View
        style={{
          marginLeft: 20,
          marginVertical: 40,
        }}>
        <Image
          source={{uri: avatar}}
          style={{height: 70, width: 70, borderRadius: 20}}
        />
        <Text
          style={{
            color: colors.white,
            fontWeight: 'bold',
            fontSize: 13,
            marginTop: 10,
          }}>
          {username}
        </Text>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity
        onPress={() => {
          ContxAuth.logout();
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50%',
          // position: 'absolute', //Here is the trick
          // bottom: 0, //Here is the trick
        }}>
        <Icon name="exit-to-app" size={25} style={{color: colors.white}} />
        <Text
          style={{
            paddingHorizontal: '5%',
            alignText: 'center',
            color: colors.white,
            fontSize: 18,
          }}>
          LogOut
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};
const HomeStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HelloCustomer"
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: 200,
          backgroundColor: colors.primary,
        },
        overlayColor: null,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: colors.secondary,
        drawerInactiveTintColor: colors.white,
        drawerItemStyle: {backgroundColor: null},
        sceneContainerStyle: {
          backgroundColor: colors.primary,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HelloCustomer"
        component={HelloCustomer}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      {/* home-circle */}
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerIcon: ({color}) => (
            <Icon
              name="home-circle"
              size={25}
              style={{marginRight: -20, color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="chat" size={25} style={{marginRight: -20, color}} />
          ),
        }}
      />

      <Drawer.Screen
        name="Detail"
        component={DetailsScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="ARviews"
        component={ARScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="Custom-Order"
        component={CustomOrder}
        options={{
          drawerIcon: ({color}) => (
            <Icon
              name="view-dashboard-edit-outline"
              size={25}
              style={{marginRight: -20, color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={CartScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="cart" size={25} style={{marginRight: -20, color}} />
          ),
        }}
      />
      <Drawer.Screen
        name="FAVOURITES"
        component={FaviouriteScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="heart" size={25} style={{marginRight: -20, color}} />
          ),
        }}
      />

      <Drawer.Screen
        name="Orders-History"
        component={OrderDetails}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="history" size={25} style={{marginRight: -20, color}} />
          ),
        }}
      />
      <Drawer.Screen
        name="PROFILE"
        component={ProfileStack}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="account" size={25} style={{marginRight: -20, color}} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeStack;
