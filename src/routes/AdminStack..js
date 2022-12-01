import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../Context/AuthContext';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Posting from '../screens/Auth/Admin/Screen/Posting';
import MessagesScreen from '../screens/Chat/MessageScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../screens/EditProfile';
import ProductScreen from '../screens/Auth/Admin/Screen/HomeScreen';
import DetailsScreen from '../screens/Products/DetailsScreen';
import OrderApproval from '../screens/Auth/Admin/Screen/OrderApproval';

const Tab = createBottomTabNavigator();

export default function AdminStack() {
  const ContxAuth = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={MessagesScreen}
        options={{
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => <Icon name="chat" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />

      <Tab.Screen
        name="Posting"
        component={Posting}
        options={{
          tabBarVisible: false,
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="book-plus-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderApproval}
        options={{
          tabBarVisible: false,
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon
              name="book-open-page-variant-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="account-box-multiple-outline" color={color} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="competitors"
        component={Competitors}
        options={{
          tabBarLabel: 'Rakipler',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="exit-to-app" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

const ProfileSt = createNativeStackNavigator();
export function ProfileStack() {
  return (
    <ProfileSt.Navigator screenOptions={{headerShown: false}}>
      <ProfileSt.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileSt.Screen name="EditProfile" component={EditProfile} />
      <ProfileSt.Screen name="AdminProducts" component={ProductScreen} />
      <ProfileSt.Screen name="Detail" component={DetailsScreen} />
    </ProfileSt.Navigator>
  );
}
