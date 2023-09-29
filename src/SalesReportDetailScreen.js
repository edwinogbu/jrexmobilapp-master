import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase';
import COLORS from './global/LandingColors';

const SalesReportDetailScreen = ({ navigation, route }) => {
  const { checkoutId } = route.params;
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const checkoutDocRef = doc(db, 'checkouts', checkoutId);
        const docSnapshot = await getDoc(checkoutDocRef);

        if (docSnapshot.exists()) {
          setCheckoutData(docSnapshot.data());
          setLoading(false);
        } else {
          setLoading(false);
          setError('Checkout data not found');
        }
      } catch (error) {
        console.log('Error fetching checkout data:', error);
        setLoading(false);
        setError('Error fetching checkout data');
      }
    };

    fetchCheckoutData();
  }, [checkoutId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
    <View style={styles.card}>

      <View style={styles.row}>
        <Text style={styles.label}>SN:</Text>
        <Text style={styles.value}>{checkoutData.sn}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Customer Name: {checkoutData.name}</Text>
        <Text style={styles.value}>{JSON.stringify(checkoutData.orders)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{checkoutData.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{checkoutData.paymentStatus}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{checkoutData.address}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.value}>{checkoutData.totalAmount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Items:</Text>
        {/* <Text style={styles.value}>{checkoutData.items}</Text> */}
        {checkoutData.items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text  style={styles.text}> {item.name}</Text>
            <Text  style={styles.text}>x {item.quantity}</Text>
          </View>
        ))}
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ligth,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default SalesReportDetailScreen;
