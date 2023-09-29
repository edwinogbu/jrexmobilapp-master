import React, { createContext, useReducer, useState, useContext, useEffect } from "react";
import { Alert } from 'react-native';
import { auth, db, firestore, storage } from '../../firebase';
import { SignInReducer } from "../reducer/authReducers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  setDoc,
  addDoc,
  getDownloadURL,
  uploadBytes,
  doc,
  collection
} from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';

export const SignInContext = createContext();

// SignInContextProvider component with updates and corrections
export const SignInContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [signedIn, dispatchSignedIn] = useReducer(SignInReducer, { userToken: null });
  const [resetEmail, setResetEmail] = useState('');

  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatchSignedIn({ type: 'UPDATE_SIGN_IN', payload: { userToken: userCredential.user.uid } });
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatchSignedIn({ type: 'UPDATE_SIGN_IN', payload: { userToken: null } });
        console.info('User signed out successfully!');
        // Call any callback function if needed
        navigation.navigate('SignInWelcomeScreen');
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const resetPassword = async () => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert('Password Reset', 'A password reset email has been sent to your email address.');
    } catch (error) {
      console.log('Password reset error:', error);
      setError('Failed to reset password. Please check your email and try again.');
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update user state
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          Address: user.address,
        });
        dispatchSignedIn({ type: 'UPDATE_SIGN_IN', payload: { userToken: user.uid } });
      } else {
        // User is signed out
        setUser({});
        dispatchSignedIn({ type: 'UPDATE_SIGN_IN', payload: { userToken: null } });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    loadUserState();
  }, []);

  const signIn = async (email, password) => {
    dispatchSignedIn({ type: 'SET_LOADING', payload: true });
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatchSignedIn({ type: 'SIGN_IN', payload: user });
      saveValueToSecureStore('user', user);
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        Address: user.address,
      });
    } catch (error) {
      console.log('Sign in error:', error);
      setError('Sign in failed. Please check your credentials and try again.');
    }
  };

  const signUp = async (name, email, phone, password, profilePicture) => {
    dispatchSignedIn({ type: 'SET_LOADING', payload: true });
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name, phoneNumber: phone, email });

      const userId = user.uid;
      const userDetails = {
        userId: user.uid,
        userType:'user',
        name,
        email,
        phone,
      };

      await saveUserDetail(userId, userDetails);

      const profilePictureUrl = await uploadProfilePicture(user.uid, profilePicture);

      await updateProfile(user, { photoURL: profilePictureUrl });

      dispatchSignedIn({ type: 'SIGN_IN', payload: user });
      saveValueToSecureStore('user', user);
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || name,
        phoneNumber: user.phoneNumber,
        Address: user.address,
      });
    } catch (error) {
      console.log('Sign up error:', error);
      setError('Sign up failed. Please try again.');
    }
  };

  const saveUserDetail = async (uid, userDetails) => {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, userDetails);
    } catch (error) {
      console.error('Error saving user details to Firestore:', error);
    }
  };

  const uploadProfilePicture = async (userId, file) => {
    const profilePictureRef = storage.ref(`profilePictures/${userId}`);
    try {
      await uploadBytes(profilePictureRef, file);
      const profilePictureUrl = await getDownloadURL(profilePictureRef);
      return profilePictureUrl;
    } catch (error) {
      console.log('Error uploading profile picture:', error);
      setError('Failed to upload profile picture. Please try again.');
      return null;
    }
  };

  const saveValueToSecureStore = async (key, value) => {
    try {
      const valueString = JSON.stringify(value);
      await SecureStore.setItemAsync(key, valueString);
    } catch (error) {
      console.log(`Error saving ${key} to SecureStore:`, error);
    }
  };

  const deleteValueFromSecureStore = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.log(`Error deleting ${key} from SecureStore:`, error);
    }
  };

  const loadUserState = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      console.log('Retrieved userString:', userString);
      if (userString !== null) {
        const user = JSON.parse(userString);
        console.log('Parsed user:', user);
        dispatchSignedIn({ type: 'SET_USER', payload: user });
      }
      dispatchSignedIn({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      console.log('Error loading user state:', error);
      dispatchSignedIn({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveQuizDetailsToFirestore = async (userId, totalQuestions, correctAnswers, wrongAnswers, percentageScore) => {
    try {
      if (userId) {
        const quizCollectionRef = collection(firestore, 'quizzes');
        const docRef = await addDoc(quizCollectionRef, {
          userId: userId,
          totalQuestions: totalQuestions,
          correctAnswers: correctAnswers,
          wrongAnswers: wrongAnswers,
          percentageScore: percentageScore,
          timestamp: new Date(),
        });
        console.log('Quiz details saved to Firestore with ID:', docRef.id);
      } else {
        console.error('Invalid userId:', userId);
      }
    } catch (error) {
      console.error('Error saving quiz details to Firestore:', error);
    }
  };

  const handleSignOut = async () => {
    dispatchSignedIn({ type: 'SET_LOADING', payload: true });
    setError(null);
    try {
      await signOut(auth);
      dispatchSignedIn({ type: 'SIGN_OUT' });
      deleteValueFromSecureStore('user');
      setUser({});
      console.log('User signed out successfully!');
      // Call any callback function if needed
      navigation.navigate('SignInWelcomeScreen');
    } catch (error) {
      console.error('Sign out error:', error);
      setError('Sign out failed. Please try again.');
    }
  };

  return (
    <SignInContext.Provider
      value={{
        user,
        error,
        signedIn,
        logIn,
        logout,
        signIn,
        signUp,
        saveQuizDetailsToFirestore,
        handleSignOut,
        resetPassword,
      }}
    >
      {children}
    </SignInContext.Provider>
  );
};
