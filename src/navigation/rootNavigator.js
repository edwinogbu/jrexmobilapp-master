import 'react-native-gesture-handler';
import React, { useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './authNavigator';
import { CartProvider } from '../CartContext';
import AppStack from './AppStack';
// import { SignInContext } from '../contexts/authContext';
import { SignInContext } from '../contexts/authContext';


export default function RootNavigator() {
  const { signedIn } = useContext(SignInContext);


  return (
    <CartProvider>
      <NavigationContainer>

        {signedIn.userToken ? (

          <AppStack />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </CartProvider>
  );
}
