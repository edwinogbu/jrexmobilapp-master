import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Share, StyleSheet, Image } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import COLORS from '../global/LandingColors';

export default function CustomerReceiptScreen({ route, navigation }) {
  const {userId, email, address, phone, items, totalAmount, paymentStatus } = route.params;
  const receiptRef = useRef(null); // Reference to the receipt view


  const handleGeneratePdf = async () => {
    try {
      // Create an HTML template for the PDF content
      const html = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
              }
              .logo {
                max-width: 100%;
                height: auto;
              }
              .section {
                margin-bottom: 20px;
              }
              .section-title {
                font-weight: bold;
                font-size: 18px;
              }
              .item {
                display: flex;
                justify-content: space-between;
                font-size: 16px;
              }
              .total-amount {
                font-weight: bold;
                font-size: 20px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <img src="./../../assets/images/logo.png" alt="Company Logo" class="logo" />
              <h1>Customer Receipt</h1>
            </div>
  
            <div class="section">
              <h2 class="section-title">User Details:</h2>
              <p>Email: ${userId}</p>
              <p>Email: ${email}</p>
              <p>Address: ${address}</p>
              <p>Phone: ${phone}</p>
            </div>
  
            <div class="section">
              <h2 class="section-title">Items:</h2>
              ${items
                .map((item) => `
                  <div class="item">
                    <p>${item.product.name}</p>
                    <p>x ${item.qty}</p>
                  </div>
                `)
                .join('')}
            </div>
  
            <div class="section">
              <h2 class="section-title">Payment Status:</h2>
              <p>${paymentStatus}</p>
            </div>
  
            <div class="section">
              <h2 class="section-title">Total Amount:</h2>
              <p class="total-amount">&#8358;${totalAmount}</p>
            </div>
          </body>
        </html>
      `;
  
      // Generate a PDF from the HTML template
      const file = await printToFileAsync({
        html: html,
        base64: false,
        width: 612, // Standard US Letter width (8.5 inches)
        height: 792, // Standard US Letter height (11 inches)
      });
  
      // Share the generated PDF
      await shareAsync(file.uri);
    } catch (error) {
      console.log('Error generating PDF:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.heading}>Customer Receipt</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>User Details:</Text>
        <Text style={styles.text}>userId: {userId}</Text>
        <Text style={styles.text}>Email: {email}</Text>
        <Text style={styles.text}>Address: {address}</Text>
        <Text style={styles.text}>Phone: {phone}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Items:</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text  style={styles.text}>{item.product.name}</Text>
            <Text  style={styles.text}>x {item.qty}</Text>
          </View>
        ))}
      </View>


      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Total Amount: &#8358;{totalAmount}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Payment Status: {paymentStatus}</Text>
      </View>
      </View>

      {/* Share button */}
      <View style={styles.shareButtonContainer}>
        <TouchableOpacity onPress={handleGeneratePdf}>
          <Text style={styles.shareButtonText}>Generate & Share PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{ ...styles.shareButtonText, margin: 20 }}>Finished</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center', 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 5,
    width: '100%', 
    backgroundColor:COLORS.white,
    borderBottomColor:COLORS.primary,
    // borderWidth:2,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal:10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  shareButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  shareButtonText: {
    backgroundColor: '#2B60DA',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logo: {
    width: 100, // Set the width and height of your logo image
    height: 100,
    marginBottom: 20, // Adjust margin as needed
  },
  text:{
    color:COLORS.dark,
    fontWeight: 'bold',
    fontSize: 14,
    paddingVertical: 2,
    paddingHorizontal: 20,
  }
});
