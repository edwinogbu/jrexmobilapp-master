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
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from './../global/LandingColors';
import products from './../global/constants/products';
import categories from '../global/constants/categories';
import HomeHeader from './../components/HomeHeader';
// import { contains } from '@firebase/util';
import  {filter}  from 'lodash/filter';
// import { getDocuments } from '../adpater';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;


import { PermissionsAndroid } from 'react-native';

async function requestCallPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: 'Phone Call Permission',
        message: 'This app needs access to make phone calls',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can make phone calls');
    } else {
      console.log('Phone call permission denied');
    }
    return granted;
  } catch (err) {
    console.warn(err);
  }
}

const HomeScreen = ({navigation}) => {
  const [disabled, setDisabled] = useState(false);
  const phoneNumber = '+2348173330147';

  async function makePhoneCall() {
    const granted = await requestCallPermission();
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      setDisabled(true);
    }
  }

  // const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  // const [products, setProducts] = React.useState([]);
  

  // React.useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const docSnap = await getDocuments("products");

  //       if(docSnap?.empty?.()) {
  //         return;
  //       }

  //       setProducts(docSnap?.docs)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchProducts();
  // }, [])
  const [searchText, setSearchText] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  const handleSearch = (text) => {
    setSearchText(text);
  };


  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.ligth,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: 'cover',
                    borderRadius: 25,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginLeft: 5,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
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
    
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <HomeHeader navigation={navigation} />
      {/* <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row', flex:1, width:100,}}>
            <Text style={{fontSize: 22}}>Hello,</Text>
            <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 10}}>
             Mr Max
            </Text>
             <Text style={{position:'relative', top:50,right:0, left:-120, fontSize: 14, color: COLORS.grey, width:400, flexDirection:'row', marginTop:-10,}}>
            What product would you like... Make your choice 
          </Text>
          </View>
         
        </View>
        <Image
          source={require('../../assets/images/study2.png')}
          style={{height: 50, width: 50, borderRadius: 25, marginVertical:15, paddingLeft:10}}
        />
      </View> */}
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for product"
            onChangeText={handleSearch}
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="tune" size={28} color={COLORS.white} />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={products}
        renderItem={({item}) => <Card product={item} />}
        style={{borderColor: COLORS.primary, backgroundColor: COLORS.ligth}}
      /> */}
         {/* <View style={style.header}> */}
         <ListProducts />
         {/* </View> */}
      <View style={style.floatButton}>
        <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate('PhoneCallButton');
          // }} 
          onPress={makePhoneCall} disabled={disabled}
           style={{ justifyContent:'center', alignContent:'center', alignSelf:'center', alignItems:'center', padding:2, margin:10}}
          >
          <Icon name="phone" size={32} color={COLORS.ligth}
                     style={{ justifyContent:'center', alignContent:'center', alignSelf:'center', alignItems:'center'}}

           />
        </TouchableOpacity>
      </View>
      {/* <View style={style.floatButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('JrexMapScreen');
          }}>
          <Icon name="place" size={32} color={COLORS.ligth} />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

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

 