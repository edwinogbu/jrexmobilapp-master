import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  Animated,
  Image,
} from 'react-native';
import { SignInContext } from './../../contexts/authContext';
import { Icon, Header } from 'react-native-elements';
import { Ionicons, Entypo } from '@expo/vector-icons';
import  Swiper  from 'react-native-swiper';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  auth, db,collection ,addDoc,setDoc, doc } from './../../../firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { signInWithPopup } from 'firebase/auth';




const SignInWelcomeScreen = ({ navigation }) => {
  const {signIn, signUp, logIn, dispatchSignedIn, user, setUser} = useContext(SignInContext)

  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const animatedValue = new Animated.Value(0);
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility


  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 0.8,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const backgroundScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const validateName = () => {
    if (name.trim() === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };
  // const validateAddress = () => {
  //   if (name.trim() === '') {
  //     setAddressError('Address is required');
  //   } else {
  //     setAddressError('');
  //   }
  // };
  
  const validateEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email is required');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  
  const validatePhone = () => {
    if (phone.trim() === '') {
      setPhoneError('Phone is required');
    } else if (!/^\d{11}$/.test(phone)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };
  
  const validatePassword = () => {
    if (password.trim() === '') {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSignUp = async () => {
    validateName();
    validateEmail();
    validatePhone();
    // validateAddress();
    validatePassword();

    if (nameError === '' && emailError === '' && phoneError === '' && passwordError === '') {
      try {
        const user = await signUp(name, email, phone, password);
        console.log(user);
        // User successfully signed up, setUser to update the user state in context
        setUser({
          name,
          email,
          phone,
          // address,
          password,
        });
        setName('');
        setEmail('');
        setPhone('');
        // setAddress('');
        setPassword('');
        setSignUpModalVisible(false);
      } catch (error) {
        console.log('Sign up error:', error);
      }
    }
  };

  const handleSignIn = () => {
    validateName();
    validatePassword();

    if (emailError === '' && passwordError === '') {
      signIn(email, password);
      setEmail('');
      setPassword('');
      setSignInModalVisible(false);
    }
  };

  const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;


  return (
    <SafeAreaView style={styles.container}>

<Header
  containerStyle={{ backgroundColor: '#2B60DA' }}
  rightComponent={
    <TouchableOpacity onPress={() => setEmailModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="mail" size={24} color="#fff" />
      <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Email</Text>
    </TouchableOpacity>
  }
  leftComponent={
    <TouchableOpacity onPress={() => setSignInModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="person" size={24} color="#fff" />
      <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Login</Text>
    </TouchableOpacity>
  }
  centerComponent={
    <View>
    
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ ...styles.timerText, color: '#FFF', fontWeight: 'bold', fontSize: 14, marginRight: 10 }}>
        08090178558
        </Text>
        <Entypo name="old-phone" size={20} color="#fff" />
      </View>
 
    </View>
  }
/>
      <Image source={require('./../../../assets/images/logo.png')} style={styles.logo} />
      
      <View style={styles.headerContainer}>
  <Text style={styles.headerText}>West or East…</Text>
  <Text style={styles.headerText}>We are the Purest.</Text>
</View>

<View style={styles.swiperContainer}>
<Swiper autoplay={true}  style={styles.wrapper} showsButtons={true}>

<View style={styles.slide1}>
    <Image
    
    source={require("../../../assets/images/water1.png")}
    style={{height:'100%', width:'100%'}}
    />
 </View>
<View style={styles.slide2}>
    <Image
     source={require("../../../assets/images/sachet-water.jpg")}

    style={{height:'100%', width:'100%'}}
    />
 </View>
<View style={styles.slide2}>
    <Image
     source={require("../../../assets/images/water2.png")}

    style={{height:'100%', width:'100%'}}
    />
 </View>
<View style={styles.slide3}>
    <Image
     source={require("../../../assets/images/water3.png")}

    style={{height:'100%', width:'100%'}}
    />
 </View>

</Swiper>
</View>



        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSignUpModalVisible(true)}
            activeOpacity={0.7}
            onPressIn={startAnimation}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setSignInModalVisible(true)}
            activeOpacity={0.7}
            onPressIn={startAnimation}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      {/* </ImageBackground> */}


      {/* Sign Up Modal */}
      <Modal animationType="slide" transparent={true} visible={signUpModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSignUpModalVisible(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle-outline" size={40} color="#2B60DA" style={{padding:8, fontWeight:20, }} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
              onBlur={validateName}
            />
            {nameError !== '' && <Text style={styles.errorText}>{nameError}</Text>}
            <TextInput
              style={styles.input}
              placeholder="email"
              value={email}
              onChangeText={setEmail}
              onBlur={validateEmail}
            />
            {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              onBlur={validatePhone}
            />
            {phoneError !== '' && <Text style={styles.errorText}>{phoneError}</Text>}
            

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onBlur={validatePassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)} // Toggle showPassword state
              style={styles.showPasswordButton}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'} // Use 'eye' icon when showing password, 'eye-off' when hiding
                size={24}
                color="#2B60DA"
              />
            </TouchableOpacity>
          </View>

            {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSignUp}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </Modal>

      {/* Sign In Modal */}
      <Modal animationType="slide" transparent={true} visible={signInModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSignInModalVisible(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle-outline" size={35} color="#2B60DA" style={{padding:10, fontWeight:20,}} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Sign In</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onBlur={validateEmail}
            />
            {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}

            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onBlur={validatePassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)} // Toggle showPassword state
              style={styles.showPasswordButton}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'} // Use 'eye' icon when showing password, 'eye-off' when hiding
                size={24}
                color="#2B60DA"
              />
            </TouchableOpacity>
          </View>

            {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSignIn}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </Modal>
      
      {/* Email In Modal */}

      <Modal animationType="slide" transparent={true} visible={emailModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setEmailModalVisible(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle-outline" size={35} color="#2B60DA" style={{padding:10, fontWeight:20,}} />
            </TouchableOpacity>
            <Text style={styles.modalText}>J-rex Official EMail</Text>
            <Text style={styles.modalTitle}>care@jrexwater.com</Text>
           
          </View>
        </View>
      </Modal>
     
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#2B60DA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 20,
    borderColor:'red',
    borderWidth:5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 3,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor:'#CCC',
    fontWeight:'900'
  },
  modalButton: {
    backgroundColor: '#2B60DA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,

  },
  closeButton: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  backgroundContainer: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 'auto',
    marginBottom: 95,
  },

  button: {
    backgroundColor: '#2B60DA',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 100,
    marginVertical: 12,
    marginHorizontal: 10,
    borderColor:'#00FCF0',
    borderWidth:5,
    
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    margin: 5,
    padding:15,
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 20,
    color:'#2B60DA',
    fontWeight: 'bold',
  },
  swiperContainer: {
    flex: 4,
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 2,
  },
  swiper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#92BBD9',
  },
  slideImage: {
    height: '100%',
    width: '100%',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#CCC',
    fontWeight: '900',
    justifyContent: 'space-between', // Align items in a row with space between
  },

  showPasswordButton: {
    padding: 5, // Adjust padding as needed for icon positioning
  },

});

export default SignInWelcomeScreen;
