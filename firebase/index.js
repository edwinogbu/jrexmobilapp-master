
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";

import { getAuth } from 'firebase/auth';
import { collection, addDoc, getDoc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry } from 'react-native';
import App from './../App';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsSC7WP0qNvxuGYJdwQSn8v_Ciw1wamYY",
  authDomain: "jrexwater-2ffc1.firebaseapp.com",
  projectId: "jrexwater-2ffc1",
  storageBucket: "jrexwater-2ffc1.appspot.com",
  messagingSenderId: "123726894567",
  appId: "1:123726894567:web:aad995c8084e8051c6d942",
  measurementId: "G-4XQ4SV2NNE",

  databaseURL: "https://jrexwater-2ffc1-default-rtdb.firebaseio.com/",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const database = getDatabase(app);
const db = getFirestore(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

// const storeItem = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, JSON.stringify(value));
//   } catch (error) {
//     console.log('Error storing data:', error);
//   }
// };

// const retrieveItem = async (key) => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     if (value !== null) {
//       return JSON.parse(value);
//     }
//   } catch (error) {
//     console.log('Error retrieving data:', error);
//   }
// };

AppRegistry.registerComponent('jrexmobileapp', () => App);

// export { app, db, auth, storeItem, retrieveItem, collection, addDoc, setDoc, getDoc };
export { app, db, database, auth,firestore,  collection, addDoc, setDoc, getDoc };
