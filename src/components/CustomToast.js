import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Toast, Colors } from 'react-native-toast-message';
import COLORS from '../global/LandingColors';

const CustomToast = ({ text1, text2, visibility }) => {
  return (
    <Toast
      style={styles.container}
      visible={visibility}
      onShow={() => console.log('Toast shown')}
      onHide={() => console.log('Toast hidden')}
    >
      <View style={styles.toastContent}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 && <Text style={styles.text2}>{text2}</Text>}
      </View>
    </Toast>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: '#37474F', // Replace with your desired color
    // backgroundColor: Colors.BLUE_GREY[800],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toastContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.ligth,
  },
  text2: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.ligth,
  },
});

export default CustomToast;
