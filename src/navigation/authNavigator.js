import * as React from 'react';
import { StyleSheet } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInWelcomeScreen from '../screens/authScreens/SignInWelcomeScreen';

import COLORS from './../global/LandingColors';
import SplashScreen from './../screens/Splash';




const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
   
      <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen}
           options = {{ 
                    headerShown:false, 
                 
            }}
         />
        <Stack.Screen name="SignInWelcomeScreen" component={SignInWelcomeScreen}
           options = {{ 
                    headerShown:false, 
         
            }}
         />
      
      </Stack.Navigator>
  
  );
};


const styles = StyleSheet.create({
   headerTitle: {
     fontSize: 20,
     color:COLORS.primary
   }
 });