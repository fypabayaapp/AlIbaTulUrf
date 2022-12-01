import React, {useContext} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';
import {AuthContext} from '../Context/AuthContext';

const ProfileScreen = ({navigation}) => {
  const ContxAuth = useContext(AuthContext);
  const User = ContxAuth.Data;
  const mode = ContxAuth.mode == 'admin';
  const name = User.username;
  const avatar = User.avatar;
  const mail = User.email;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      {!mode && (
        <View style={styles.header}>
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
            User Profile
          </Text>
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image source={{uri: avatar}} size={80} />
            <View style={{marginLeft: 20}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                {name}{' '}
              </Title>
              {/* <Caption style={styles.caption}>@j_doe</Caption> */}
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {User.address}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {User.contact}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>{mail}</Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() => {
              navigation.navigate(mode ? 'AdminProducts' : 'FAVOURITES');
            }}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>
                {' '}
                {mode ? 'Your Products' : 'Your Favorites'}
              </Text>
            </View>
          </TouchableRipple>

          {/* <TouchableRipple
            onPress={() => {
              
            }}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Tell Your Friends</Text>
            </View>
          </TouchableRipple> */}
          {/* <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple> */}
          <TouchableRipple onPress={() => navigation.navigate('EditProfile')}>
            <View style={styles.menuItem}>
              <Ionicons name="settings-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Update</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => ContxAuth.logout()}>
            <View style={styles.menuItem}>
              <Ionicons name="exit-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>LogOut</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 650,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    alignItems: 'center',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
