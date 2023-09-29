// import React, { useEffect, useState, useContext, useRef } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Image,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   ToastAndroid,
//   SafeAreaView,
// } from 'react-native';
// import { Paystack } from 'react-native-paystack-webview';
// import { CartContext } from '../CartContext';
// import COLORS from './../global/LandingColors';
// import { auth, db, firestore } from './../../firebase';
// import {
//   collection,
//   addDoc,
//   doc,
//   onSnapshot,
// } from 'firebase/firestore';
// import { Ionicons } from '@expo/vector-icons';

// export default function CheckoutScreen({ navigation }) {
//   const { items, emptyCart, getTotalAmount } = useContext(CartContext);

//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setPhone] = useState('');
//   const [name, setName] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const paystackWebViewRef = useRef(null);

//   const [selectedTab, setSelectedTab] = useState('companyDetail'); // Initial tab

//   const handleProceed = () => {
//     if (email === '' || address === '' || phone === '' || name === '') {
//       // One or more fields are empty, display an alert
//       Alert.alert('Error', 'Please fill in all the required fields');
//     } else {
//       // All fields are filled, start the payment transaction
//       paystackWebViewRef.current.startTransaction();
//     }
//   };

//   const formattedDate = `${new Date().toLocaleDateString()}`;

//   // Function to fetch user ID from Firestore based on email
// const fetchUserId = async (userEmail) => {
//   const usersCollection = collection(firestore, 'users');
//   const querySnapshot = await getDocs(query(usersCollection, where('email', '==', userEmail)));

//   if (!querySnapshot.empty) {
//     const userDoc = querySnapshot.docs[0];
//     return userDoc.id; // Return the user's ID
//   }

//   return null; // Return null if user not found
// };


//   useEffect(() => {
//     const user = auth.currentUser;
//     if (user) {
//       const userDocRef = doc(db, 'users', user.uid);
//       const unsubscribe = onSnapshot(userDocRef, (doc) => {
//         if (doc.exists()) {
//           const userData = doc.data();
//           setEmail(userData.email);
//           setPhone(userData.phone);
//           setName(userData.name);
//         }
//       });

//       return () => unsubscribe();
//     }
//   }, []);

//   const handlePaymentSuccess = async (response) => {
//     const user = auth.currentUser;

//     if (user) {
//       const userEmail = user.email;
//       const userId = await fetchUserId(userEmail);
//     emptyCart();
//     navigation.navigate('CustomerReceiptScreen', {
//       userId, // Include the user's ID
//       email: email,
//       address: address,
//       phone: phone,
//       name: name,
//       items: items,
//       totalAmount: getTotalAmount().toFixed(2),
//       paymentStatus: 'Success', // Set the appropriate payment status here
//     });

//     ToastAndroid.show('Payment successful!', ToastAndroid.SHORT);

//     const checkoutDetails = {
//       userId, // Include the user's ID
//       email,
//       address,
//       phone,
//       name,
//       items: items.map((item) => ({
//         name: item.product.name,
//         quantity: item.qty,
//       })),
//       totalAmount: getTotalAmount().toFixed(2),
//       date: formattedDate,
//       paymentStatus: 'success', // Add payment status
//     };

//     try {
//       const docRef = await addDoc(collection(firestore, 'checkouts'), checkoutDetails);
//       console.log('Checkout details saved with ID:', docRef.id);
//     } catch (error) {
//       console.error('Error saving checkout details:', error);
//     }
//   }
//   };

//   const handlePaymentError = async (error) => {
//     const user = auth.currentUser;

//     if (user) {
//       const userEmail = user.email;
//       const userId = await fetchUserId(userEmail);
//     navigation.navigate('CustomerReceiptScreen', {
//       userId,
//       email: email,
//       address: address,
//       phone: phone,
//       name: name,
//       items: items,
//       totalAmount: getTotalAmount().toFixed(2),
//       paymentStatus: 'error', // Set the appropriate payment status here
//     });
//     emptyCart();
//     ToastAndroid.show('Payment failed. Please try again.', ToastAndroid.SHORT);

//     const checkoutDetails = {
//       userId,
//       email,
//       address,
//       phone,
//       name,
//       items: items.map((item) => ({
//         name: item.product.name,
//         quantity: item.qty,
//       })),
//       totalAmount: getTotalAmount().toFixed(2),
//       date: formattedDate,
//       paymentStatus: 'error', // Add payment status
//     };

//     try {
//       const docRef = await addDoc(collection(firestore, 'checkouts'), checkoutDetails);
//       console.log('Checkout details saved with ID:', docRef.id);
//     } catch (error) {
//       console.error('Error saving checkout details:', error);
//     }
//   }
//   };

//   const handlePaymentCancel = async () => {
//     const user = auth.currentUser;

//     if (user) {
//       const userEmail = user.email;
//       const userId = await fetchUserId(userEmail);
//     emptyCart();
//     navigation.navigate('CustomerReceiptScreen', {
//       userId,
//       email: email,
//       address: address,
//       phone: phone,
//       name: name,
//       items: items,
//       totalAmount: getTotalAmount().toFixed(2),
//       paymentStatus: 'cancelled', // Set the appropriate payment status here
//     });
//     ToastAndroid.show('Payment cancelled.', ToastAndroid.SHORT);

//     const checkoutDetails = {
//       userId,
//       email,
//       address,
//       phone,
//       name,
//       items: items.map((item) => ({
//         name: item.product.name,
//         quantity: item.qty,
//       })),
//       totalAmount: getTotalAmount().toFixed(2),
//       date: formattedDate,
//       paymentStatus: 'cancelled', // Add payment status
//     };

//     try {
//       const docRef = await addDoc(collection(firestore, 'checkouts'), checkoutDetails);
//       console.log('Checkout details saved with ID:', docRef.id);
//     } catch (error) {
//       console.error('Error saving checkout details:', error);
//     }
//   }
//   };
import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import { Paystack } from 'react-native-paystack-webview';
import { CartContext } from '../CartContext';
import COLORS from './../global/LandingColors';
import { auth, db, firestore } from './../../firebase';
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  getDocs,
  query,
  where,
} from 'firebase/firestore'; // Ensure the correct import path
import { Ionicons } from '@expo/vector-icons';

export default function CheckoutScreen({ navigation }) {
  const { items, emptyCart, getTotalAmount } = useContext(CartContext);

  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const paystackWebViewRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState('companyDetail'); // Initial tab

  const handleProceed = () => {
    if (email === '' || address === '' || phone === '' || name === '') {
      // One or more fields are empty, display an alert
      Alert.alert('Error', 'Please fill in all the required fields');
    } else {
      // All fields are filled, start the payment transaction
      paystackWebViewRef.current.startTransaction();
    }
  };

  const formattedDate = `${new Date().toLocaleDateString()}`;

  // Function to fetch user ID from Firestore based on email
  const fetchUserId = async (userEmail) => {
    const usersCollection = collection(firestore, 'users');
    const querySnapshot = await getDocs(
      query(usersCollection, where('email', '==', userEmail))
    );

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.id; // Return the user's ID
    }

    return null; // Return null if the user is not found
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setEmail(userData.email);
          setPhone(userData.phone);
          setName(userData.name);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const handlePaymentSuccess = async (response) => {
    const user = auth.currentUser;

    if (user) {
      const userEmail = user.email;
      const userId = await fetchUserId(userEmail);
      emptyCart();
      navigation.navigate('CustomerReceiptScreen', {
        userId, // Include the user's ID
        email: email,
        address: address,
        phone: phone,
        name: name,
        items: items,
        totalAmount: getTotalAmount().toFixed(2),
        paymentStatus: 'Success', // Set the appropriate payment status here
      });

      ToastAndroid.show('Payment successful!', ToastAndroid.SHORT);

      const checkoutDetails = {
        userId, // Include the user's ID
        email,
        address,
        phone,
        name,
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.qty,
        })),
        totalAmount: getTotalAmount().toFixed(2),
        date: formattedDate,
        paymentStatus: 'success', // Add payment status
      };

      try {
        const docRef = await addDoc(collection(firestore, 'checkouts'), checkoutDetails);
        console.log('Checkout details saved with ID:', docRef.id);
      } catch (error) {
        console.error('Error saving checkout details:', error);
      }
    }
  };

  const handlePaymentError = async (error) => {
    const user = auth.currentUser;

    if (user) {
      const userEmail = user.email;
      const userId = await fetchUserId(userEmail);
      navigation.navigate('CustomerReceiptScreen', {
        userId,
        email: email,
        address: address,
        phone: phone,
        name: name,
        items: items,
        totalAmount: getTotalAmount().toFixed(2),
        paymentStatus: 'error', // Set the appropriate payment status here
      });
      emptyCart();
      ToastAndroid.show('Payment failed. Please try again.', ToastAndroid.SHORT);

      const checkoutDetails = {
        userId,
        email,
        address,
        phone,
        name,
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.qty,
        })),
        totalAmount: getTotalAmount().toFixed(2),
        date: formattedDate,
        paymentStatus: 'error', // Add payment status
      };

      try {
        const docRef = await addDoc(collection(firestore, 'checkouts'), checkoutDetails);
        console.log('Checkout details saved with ID:', docRef.id);
      } catch (error) {
        console.error('Error saving checkout details:', error);
      }
    }
  };

  const handlePaymentCancel = async () => {
    const user = auth.currentUser;

    if (user) {
      const userEmail = user.email;
      const userId = await fetchUserId(userEmail);
      emptyCart();
      navigation.navigate('CustomerReceiptScreen', {
        userId,
        email: email,
        address: address,
        phone: phone,
        name: name,
        items: items,
        totalAmount: getTotalAmount().toFixed(2),
        paymentStatus: 'cancelled', // Set the appropriate payment status here
      });
      ToastAndroid.show('Payment cancelled.', ToastAndroid.SHORT);

      const checkoutDetails = {
        userId,
        email,
        address,
        phone,
        name,
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.qty,
        })),
        totalAmount: getTotalAmount().toFixed(2),
        date: formattedDate,
        paymentStatus: 'cancelled', // Add payment status
      };

      try {
        const docRef = await addDoc(collection(firestore, 'checkouts'), checkoutDetails);
        console.log('Checkout details saved with ID:', docRef.id);
      } catch (error) {
        console.error('Error saving checkout details:', error);
      }
    }
  };


  return (
    <SafeAreaView style={styles.container}>
<View style={styles.tabContainer}>
  <TouchableOpacity
    style={[styles.tabButton, selectedTab === 'companyDetail' && styles.selectedTab]}
    onPress={() => setSelectedTab('companyDetail')}
  >
    <Text style={styles.tabButtonText}>Manual Payment </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.tabButton, selectedTab === 'payment' && styles.selectedTab]}
    onPress={() => setSelectedTab('payment')}
  >
    <Text style={[styles.tabButtonText, { color: selectedTab === 'payment' ? 'white' : 'black' }]}>
      Payment
    </Text>
  </TouchableOpacity>
</View>

      {selectedTab === 'companyDetail' && (
        <View style={styles.cardContainer}>
          <View style={{marginTop:10, }}>
                    <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />
            </View>
          <View style={{marginTop:10, }}>
          <Text style={{color:COLORS.primary, fontWeight:'bold', fontSize:25, textAlign:'center'}}>J-Rex Water Company</Text>
          <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:16, textAlign:'justify'}}>Kindly Send screenshot of payment receipt for confirmation to:</Text>
          <Text style={{color:COLORS.dark, fontWeight:'bold'}}>WhatsApp :
          <Text style={{fontWeight:'bold', fontSize:18, color:COLORS.primary}}>08090178558</Text> {`\n`}</Text>
          </View>
         
          <View style={{marginTop:10, }}>
          <Text style={{fontWeight:'bold', fontSize:18}}>Account Number : 1020012026 {'\n'} </Text>
          <Text style={{fontWeight:'bold', fontSize:18, textAlign:'justify'}}>Account Name   :{'\n'}  J-REX UNITED BUSINES LTD {'\n'} </Text>
          <Text style={{fontWeight:'bold', fontSize:18}}>Bank Name      : UBA</Text>
          </View>
          
          <View style={{marginTop:20, }}>
          <Text  style={{color:COLORS.primary, fontWeight:'bold', textAlign:'center'}}>Thanks for your patronage</Text>
          </View>
        </View>
      )}
      {selectedTab === 'payment' && (
         <View style={styles.cardContainer}>
         <TextInput
           style={styles.input}
           placeholder="Email"
           value={email}
           onChangeText={setEmail}
         />
     
     <View style={styles.textAreaContainer}>
       <TextInput
         style={styles.textAreaInput}
         placeholder="Address"
         value={address}
         onChangeText={setAddress}
         multiline={true}
         numberOfLines={4} // You can adjust the number of lines as needed
       />
     </View>
 
         <TextInput
           style={styles.input}
           placeholder="Phone"
           value={phone}
           onChangeText={setPhone}
         />
         <TextInput
           style={styles.input}
           placeholder="Name"
           value={name}
           onChangeText={setName}
         />
       <View style={styles.buttonContainer}>
         <TouchableOpacity
           style={styles.placeOrderButton}
           // onPress={() => paystackWebViewRef.current.startTransaction()}
           onPress={handleProceed}
           disabled={isLoading}
         >
           <Text style={styles.buttonText}>Place Order</Text>
         </TouchableOpacity>
         {isLoading && (
           <ActivityIndicator size="small" color="#0000ff" style={styles.loadingIndicator} />
         )}
       </View>
         <Paystack
           paystackKey="pk_test_b3950366e577a3bdbd3a9c7cb88622449de37913"
           billingPhoneNumber={phone}
           billingName={name}
           amount={getTotalAmount().toFixed(2)}
           billingEmail={email}
           refNumber={new Date().getTime().toString()}
           onCancel={handlePaymentCancel}
           onSuccess={handlePaymentSuccess}
           onError={handlePaymentError}
           autoStart={false}
           ref={paystackWebViewRef}
           style={styles.loadingIndicator}
           ButtonText="Pay Now"
           showPayButton={true}
           showPayOption={true}
           channels={['card', 'bank', 'ussd']}
           currency="NGN"
           activityIndicatorColor="green"
           SafeAreaViewContainer={{ marginTop: 25 }}
           SafeAreaViewContainerModal={{ marginTop: 25 }}
         />
       </View>
        // </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.ligth,
    marginTop:15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  proceedButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 4,
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingIndicator: {
    // Add your loading indicator styles here
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  placeOrderButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingHorizontal: 60,
    paddingVertical: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },


  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textAreaContainer: {
    width: '100%',
    marginBottom: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
  },
  textAreaInput: {
    height: 100, // Adjust the height as needed
    paddingHorizontal: 8,
    paddingTop: 8, // Add padding at the top to center-align text vertically
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  selectedTab: {
    borderBottomColor: COLORS.secondary,
  },
  tabButtonText: {
    fontWeight: 'bold',
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textAreaContainer: {
    width: '100%',
    marginBottom: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
  },
  textAreaInput: {
    height: 100,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  placeOrderButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingHorizontal: 60,
    paddingVertical: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure it's above other components
  },
  loadingText: {
    color: COLORS.white, // Text color
    fontSize: 16,
    marginTop: 10, // Adjust the spacing as needed
  },

  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.ligth,
    backgroundColor: COLORS.grey,

  },

  tabButtonText: {
    fontWeight: 'bold',
    color: COLORS.white, // Set text color to white

  },

  selectedTab: {
    borderBottomColor: COLORS.white,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderLeftColor: COLORS.white,
    borderBottomWidth: 5,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    margin: 5,
    padding:25,
    marginBottom:20,
  },
});
