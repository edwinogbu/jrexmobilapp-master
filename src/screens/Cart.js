import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {  items, getItemsCount, getTotalPrice, incrementItemQty, decrementItemQty, emptyCart  } from '../CartContext';
import {CartContext} from '../CartContext';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../global/LandingColors';
import { PrimaryButton } from '../components/Button';
import { SignInContext } from '../contexts/authContext';

// import {  auth, db, firestore, addDoc, collection } from './../components/config';
import {  auth, db, firestore, addDoc, collection, doc, docs, getDocs  } from './../../firebase';


export function Cart({ navigation }) {
  const {  items, removeItemFromCart, getItemsCount, getTotalPrice, incrementItemQty, decrementItemQty, emptyCart, getSubTotal,
    getTotal, getTotalAmount, getCardSubTotal } = useContext(CartContext);

    const { signedIn, dispatchSignedIn, createUser, signIn, logout, user } = useContext(SignInContext);

    const [itemsInfo, setItemsInfo] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cardSubtotals, setCardSubtotals] = useState([]);
    // const db = firebase.firestore;


    useEffect(() => {
      setItemsInfo(items);
      setTotalAmount(getTotalAmount(totalPrice));
      const totalPrice = items.reduce((sum, item) => sum + item.qty * item.product.price, 0).toFixed(2);

    }, [items]);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    

    function handleCheckout() {
      const cartInformation = items.map(item => ({
        name: item.product.name,
        amount: (item.qty * item.product.price).toFixed(2),
        count: item.qty
      }));
      const totalAmount = getTotalAmount();
      const userInformation = {
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone
      };
    
      const orderDetails = {
        cart: cartInformation,
        total: totalAmount,
        user: userInformation,
        orderDate: formattedDate,
      };

        // Pass cartInformation and userInformation as route parameters
        navigation.navigate('CheckoutScreen', {
          cartInformation: cartInformation,
          userInformation: userInformation,
          orderDetails:orderDetails,
         
        });
     
    }


      
  function renderItem({ item }) {
    const subtotal = getCardSubTotal(item);
    cardSubtotals.push(subtotal);
    return (

      
      <View style={styles.cartCard}>
       <View style={{top:-70, marginBottom:20, borderRadius:35}}>
                <TouchableOpacity onPress={() => emptyCart(item)} style={{...styles.emptyBtn, backgroundColor:COLORS.ligth, borderRadius:100,}}>
                  <Text style={{ color:'#f31f31', fontWeight: 'bold', borderRadius:100, }}>Empty{'\n'} All</Text>
                </TouchableOpacity>
              </View>
  <Image source={item.product.image} style={{height: 80, width: 80, marginRight: 20}} />
  <View style={{alignItems: 'center', flex: 1, paddingVertical: 20,  top:0, right:-50, bottom:80}}>

      <View style={{marginTop:20, paddingTop:20}}>
  <View style={{flexDirection: 'row', justifyContent:'center', paddingVertical: 20,  top:-50}}>
  <Text style={{fontWeight: 'bold', fontSize: 16, flexDirection:'row', justifyContent:'center'}}>{item.product.name.slice(0, 10)}:  {item.qty} = &#8358;{(item.qty * item.product.price).toFixed(2)} </Text>

      </View>
    
           
  </View>
  </View>
  <View style={{alignItems: 'center', flex: 1, paddingVertical: 20,  top:37, right:10, bottom:-30}}>
   

          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={() => decrementItemQty(item.id)} style={styles.actionBtn}>
              <Icon name="remove-circle" size={25} color={COLORS.white} style={{ fontWeight: 'bold' }} />
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.qty}</Text>
            <TouchableOpacity onPress={() => incrementItemQty(item.id)} style={styles.actionBtn}>
              <Icon name="add-circle" size={25} color={COLORS.white} style={{ fontWeight: 'bold' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeItemFromCart(item.id)} style={styles.emptyBtn}>
            <Icon name='restore-from-trash' size={21} color={COLORS.secondary} style={{ fontWeight: 'bold', top:-4}} />
          </TouchableOpacity>
              </View>
  </View>
           
</View>


    );
  }

  return (
    <View style={{ flex: 1 }}>
{itemsInfo.length > 0 ? (
<View style={{ flex: 1 }}>
    <FlatList
      style={{...styles.itemsList,
      }}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.product.id.toString()}
      ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
  
    />
<View style={styles.bottomSheet}>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20 }}>
<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Proceed:</Text>
{/* <Text style={{ fontWeight: 'bold', fontSize: 18 }}>&#8358;{totalAmount.toFixed(2)}</Text> */}
</View>
<PrimaryButton style={{ width:50}}title="Checkout" onPress={handleCheckout} />
</View>
</View>
) : (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Text style={{ fontSize: 22, fontWeight: 'bold' }}>Your cart is empty</Text>
</View>
)}
</View>
    
  );
}
const styles = StyleSheet.create({
  cartLine: { 
    flexDirection: 'row',
  },
  cartLineTotal: { 
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1
  },
  lineTotal: {
    fontWeight: 'bold',    
  },
  lineLeft: {
    fontSize: 15, 
    lineHeight: 40, 
    color:'#333333' 
  },
  lineRight: { 
    flex: 1,
    fontSize: 20, 
    fontWeight: 'bold',
    lineHeight: 40, 
    color:'#333333', 
    textAlign:'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  actionBtnCon: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },


  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 100,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 13.84,
    elevation: 5,
    marginVertical: 10,
  },

  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    backgroundColor:COLORS.primary,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  emptyBtn: {
    backgroundColor:COLORS.dark,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  
  bottomSheet:{
  backgroundColor: '#fff', // set background color of bottom sheet
  borderTopLeftRadius: 10, // set border radius for top-left corner
  borderTopRightRadius: 10, // set border radius for top-right corner
  paddingHorizontal: 20, // set horizontal padding
  paddingVertical: 10, // set vertical padding

},
timerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

});


