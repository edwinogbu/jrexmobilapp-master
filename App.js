import React from 'react';

import { View, StyleSheet, StatusBar  } from 'react-native';
import { colors } from './src/global/styles';
import RootNavigator from './src/navigation/rootNavigator';

import { SignInContextProvider } from './src/contexts/authContext';

export default function App() {
  return (
    <SignInContextProvider>

    <View style={styles.container}>
      <StatusBar   
       barStyle = 'light-content'
       backgroundColor = {colors.grey2}
      />
   
     <RootNavigator />
    
    
    </View>
    </SignInContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
