import React, { useState, useEffect } from 'react';import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Linking,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from './../global/LandingColors';
import products from './../global/constants/products';
import categories from '../global/constants/categories';
import HomeHeader from './../components/HomeHeader';

import * as IntentLauncher from 'expo-intent-launcher';


const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;


import { PermissionsAndroid } from 'react-native';

const LandingScreen = ({navigation}) => {
  const [disabled, setDisabled] = useState(false);
 
  const makePhoneCall = () => {
    const phoneNumber = '+2348173330147'; // Replace with the desired phone number

    // Check if the device supports making phone calls
    Linking.canOpenURL(`tel:${phoneNumber}`)
      .then((supported) => {
        if (supported) {
          // Launch the dialer with the specified phone number
          IntentLauncher.startActivityAsync(IntentLauncher.ACTION_DIAL, {
            data: `tel:${phoneNumber}`,
          });
        } else {
          console.log('Phone call not supported on this device.');
        }
      })
      .catch((error) => console.error('Error checking phone call support:', error));
  };


  const [searchText, setSearchText] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  useEffect(() => {
    setFilteredProducts(
      selectedCategoryIndex === 0
        ? products
        : products.filter((item) => item.categoryId === categories[selectedCategoryIndex].id)
    );
  }, [selectedCategoryIndex]);

  const contains = ({ name }, query) => {
    if (name.includes(query)) {
      return true;
    }

    return false;
  };

  // Define the handleSearchByText function within the component
  const handleSearchByText = (query) => {
    // Convert the query to lowercase for case-insensitive search
    const lowercaseQuery = query.toLowerCase();

    // Use filter to find products that match the query in name or description
    const results = filteredProducts.filter((product) => {
      const lowercaseName = product.name.toLowerCase();
      const lowercaseDescription = product.description.toLowerCase();

      return (
        lowercaseName.includes(lowercaseQuery) ||
        lowercaseDescription.includes(lowercaseQuery)
      );
    });

    return results;
  };

  // Handle search text input
  const handleSearch = (text) => {
    setSearchText(text);
    // Use the handleSearchByText function to get search results
    const results = handleSearchByText(text);
    setSearchResults(results);
  };



  const Card = ({product}) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DetailsScreen', product)}>
        <View style={style.card}>
          <View style={{alignItems: 'center', top: -40}}>
            <Image
              source={product.image}
              style={{height: 120, width: 120, borderRadius: 50}}
            />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {product.name}
            </Text>
            <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>
              {product.ingredients}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              &#8358;{product.price}
            </Text>
            <View style={style.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };


  const ListProducts = () => {
    return (
      <FlatList
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={filteredProducts.filter(product => contains(product, searchText))}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => <Card product={item} />}
      style={{borderColor: COLORS.primary, backgroundColor: COLORS.ligth}}
    
    />
    );
    };

    const SearchListProducts = () => {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // Use searchResults instead of filteredProducts
          data={searchText ? searchResults : filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card product={item} />}
          style={{ borderColor: COLORS.primary, backgroundColor: COLORS.light }}
        />
      );
    }
    
  return (
    
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HomeHeader navigation={navigation} />
    
        <View style={{ marginTop: 20, flexDirection: 'row', paddingHorizontal: 20 }}>
          <View style={style.inputContainer}>
            <Icon name="search" size={28} />
            <TextInput
              style={{ flex: 1, fontSize: 18 }}
              placeholder="Search for product"
              onChangeText={handleSearch}
            />
          </View>
          <View style={style.sortBtn}>
            <Icon name="tune" size={28} color={COLORS.white} />
          </View>
        </View>
        <View>
          {/* <ListCategories /> */}
        </View>
        {/* Conditionally render ListProducts or SearchListProducts */}
        {searchText ? <SearchListProducts /> : <ListProducts />}
    
        {/* <View style={style.floatButton}>
          <TouchableOpacity
            onPress={makePhoneCall}
            disabled={disabled}
            style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', padding: 2, margin: 10 }}>
            <Icon name="phone" size={32} color={COLORS.ligth}
              style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}
            />
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>

    
  );
};

export default LandingScreen;

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: COLORS.ligth,
    alignItems: 'center',
    paddingHorizontal: 20,
    color: COLORS.white,
    // paddingVertical:20,
    marginVertical:2,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  floatButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    backgroundColor: COLORS.primary,
    elevation: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    borderColor: COLORS.dark,
  },
});
