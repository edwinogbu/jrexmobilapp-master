import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, withBadge } from 'react-native-elements';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { firestore } from './../../firebase';
import { colors } from '../global/styles';
import COLORS from './../global/LandingColors';
import { CartContext } from '../CartContext';

export default function HomeHeader({ navigation }) {
  const { getItemsCount } = useContext(CartContext);
  const count = getItemsCount();
  const BadgeIcon = withBadge(count, {
    badgeStyle: styles.cartBadge,
    textStyle: styles.cartText, // Add this line
  })(Icon);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const checkoutsRef = collection(firestore, 'checkouts');
        const checkoutsSnapshot = await getDocs(checkoutsRef);
        const checkoutsCount = checkoutsSnapshot.size;
        setNotificationCount(checkoutsCount);
      } catch (error) {
        console.error('Error fetching notification count:', error);
      }
    };

    const unsubscribe = onSnapshot(collection(firestore, 'checkouts'), () => {
      fetchNotificationCount();
    });

    return () => unsubscribe();
  }, []);

  const handleTransactionHistoryPress = () => {
    setNotificationCount(0);
    navigation.navigate('TransactionHistoryScreen');
  };

  const renderMenuIcon = () => (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => navigation.toggleDrawer()}
    >
      <Icon
        type='material-community'
        name="menu"
        color={colors.cardbackground}
        size={32}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.header}>
      {renderMenuIcon()}

      <Text style={styles.orderText}>Order: 08090178558</Text>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Cart')}
      >
        <BadgeIcon
          type="material-community"
          name="cart"
          size={25}
          color={colors.cardbackground}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleTransactionHistoryPress}
      >
        <View style={styles.notificationBadge}>
          {notificationCount > 0 && (
            <Text style={styles.notificationText}>{notificationCount}</Text>
          )}
        </View>
        <Icon
          name="bell" // Replace with the appropriate icon name
          type="material-community"
          size={25}
          color={colors.cardbackground}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconContainer: {
    padding: 5,
  },
  orderText: {
    color: 'white', // Make the text white
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'red', // Red background
    borderRadius: 50, // Make it round
    padding: 4,
    paddingHorizontal:10,
  },
  cartBadge: {
    backgroundColor: 'red', // Red background
    borderRadius: 50, // Make it round
    borderColor: 'white', // White border
    borderWidth: 1, // Add border
  },
  cartText: {
    color: 'white', // Make the text white
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red', // Red background
    borderRadius: 50, // Make it round
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white', // Make the text white
    fontSize: 14,
    fontWeight: 'bold',
  },
});

