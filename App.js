import {Alert, BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/routes/AuthStack';
import HomeStack from './src/routes/DrawerNavigator';
import AuthContextProvider, {AuthContext} from './src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartContextProvider from './src/Context/Cart-context';
import FavContextProvider from './src/Context/fav-context';
import AdminStack from './src/routes/AdminStack.';

export default function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <FavContextProvider>
          <Navigation />
        </FavContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

function Navigation() {
  const ContxAuth = useContext(AuthContext);
  // const isAdmin
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    async function getToken() {
      const mode = await AsyncStorage.getItem('mode');

      const token = await AsyncStorage.getItem('token');
      const data = JSON.parse(await AsyncStorage.getItem('user'));

      if (token) ContxAuth.authenticate(token, data, mode);

      return;
    }

    getToken();
  }, []);

  return (
    <NavigationContainer>
      {ContxAuth.isTokenValide ? (
        ContxAuth.mode == 'customer' ? (
          <HomeStack />
        ) : (
          <AdminStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {AdminStack} from './src/routes/AdminStack.';
// import {NavigationContainer} from '@react-navigation/native';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AdminStack />
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({});
