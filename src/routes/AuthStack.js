import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from './SplashScreen';
import Instructions from '../screens/Instructions';
import CustomerSignIn from '../screens/Auth/User/CustomerSignIn';
import Options from '../screens/Options';
import CustomerSignUp from '../screens/Auth/User/CustomerSignUp';
import AdminSignIn from '../screens/Auth/Admin/AdminSignIn';

//import { firebaseConfig } from "./config";
//firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Instructions" component={Instructions} />
      <Stack.Screen name="Options" component={Options} />
      <Stack.Screen name="CustomerSignIn" component={CustomerSignIn} />
      <Stack.Screen name="CustomerSignUp" component={CustomerSignUp} />
      <Stack.Screen name="AdminSignIn" component={AdminSignIn} />
    </Stack.Navigator>
  );
};

export default AuthStack;
