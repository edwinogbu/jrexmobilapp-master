
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../global/LandingColors';
import { SecondaryButton } from '../components/Button';
import products from './../global/constants/products';
import { CartContext } from '../CartContext';
import { useNavigation } from '@react-navigation/native';

const CustomToast = ({ text1, text2, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 2000); // Automatically close the toast after 2 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <TouchableOpacity style={styles.toastContainer} activeOpacity={0.8} onPress={onClose}>
      <View style={styles.toastContent}>
        <Text style={styles.toastText1}>{text1}</Text>
        {text2 && <Text style={styles.toastText2}>{text2}</Text>}
      </View>
      <Icon name="close" size={20} color={COLORS.white} style={styles.closeIcon} onPress={onClose} />
    </TouchableOpacity>
  );
};

const DetailsScreen = ({ route }) => {
  const item = route.params;
  const [product, setProduct] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // Track the number of items added to cart
  const { addItemToCart } = useContext(CartContext);
  const navigation = useNavigation();

  useEffect(() => {
    setProduct(products.find((product) => product.id === item.id));
  }, [item]);

  function onAddToCart() {
    addItemToCart(product.id);
    setCartItemCount((prevCount) => prevCount + 1); // Increment the cart item count
    setShowToast(true); // Show the toast message
  }

  function navigateToCart() {
    navigation.navigate('Cart'); // Replace 'Cart' with the actual screen name for the cart screen
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        {/* <Icon name="arrow-back-ios" size={28} onPress={() => navigation.goBack()} /> */}
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add To Cart and Proceed</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={navigateToCart}>
              <Icon name="arrow-forward" color={COLORS.primary} size={25} />
              <Icon name="shopping-cart" color={COLORS.primary} size={35} />
              {cartItemCount > 0 && ( // Display the cart item count if it's greater than 0
                <View style={styles.cartItemCount}>
                  <Text style={styles.cartItemCountText}>{cartItemCount}</Text>
                </View>
              )}
            </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}
        >
          <Image source={item.image} style={{ height: 220, width: 220 }} />
        </View>
        <View style={styles.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: COLORS.white,
              }}
            >
              {item.name}
            </Text>
            <TouchableOpacity style={styles.iconContainer} onPress={navigateToCart}>
              <Icon name="arrow-forward" color={COLORS.primary} size={25} />
              {/* <Icon name="shopping-cart" color={COLORS.primary} size={25} /> */}
              {cartItemCount > 0 && ( // Display the cart item count if it's greater than 0
                <View style={styles.cartItemCount}>
                  <Text style={styles.cartItemCountText}>{cartItemCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.detailsText}>{item.description}</Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton title="Add To Cart" onPress={onAddToCart} />
          </View>
        </View>
      </ScrollView>
      {showToast && (
        <CustomToast
          text1="Success!"
          text2={`${
            cartItemCount === 1 ? '1 item' : `${cartItemCount} items`
          } added to cart successfully.`}
          onClose={() => setShowToast(false)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },


  toastContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'green', // Green background color
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toastContent: {
    flex: 1,
    marginRight: 10,
  },
  toastText1: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.white,
  },
  toastText2: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  cartItemCount: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  cartItemCountText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  closeIcon: {
    marginLeft: 10,
    fontWeight: 'bold',
  },



  
});

export default DetailsScreen;
