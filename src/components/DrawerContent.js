import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import COLORS from './../global/LandingColors';
import { SignInContext } from './../contexts/authContext';
import { auth, db, firestore, } from './../../firebase';
import { setDoc, addDoc, getDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';

const DrawerContent = (props) => {
  const { signedIn, dispatchSignedIn, createUser, signIn, logout, user, handleSignOut, setUser } = useContext(SignInContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [checkUser, setCheckUser] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
  const fetchCheckUser = async () => {
    try {
      const user = auth.currentUser;
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUserData(userData);

        // Assuming 'userType' is a field in the user document
        const userType = userData.userType;

        setCheckUser([userData]);
        setIsUser(userType === 'user');
        setIsAdmin(userType === 'admin');
      }
    } catch (error) {
      setUser('');
      setUserData('');
      console.error('Error fetching checkUser:', error);
    }
  };

  if (user) {
    fetchCheckUser();
  }
}, [user]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [profileData, setProfileData] = useState(null);


  // useEffect(() => {
  //   fetchProfileData();
  // }, []);

  // const fetchProfileData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const user = auth.currentUser;
  //     const docRef = doc(firestore, 'users', user.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setProfileData(docSnap.data());
  //       // setEditedProfileData(docSnap.data()); // Set editedProfileData to initialize with the existing profile data
  //     // } else {
  //     //   await createProfileData(user.uid);
  //     }
  //     // if (docSnap.exists()) {
  //       const userData = docSnap.data();
  //       setUser(userData);
  //       setUserData(userData);
  //     // }
  //   } catch (error) {
  //     setUser('');
  //     setUserData('');
  //     console.error('Error fetching profile data:', error);
  //   }
  //   setIsLoading(false);
  // };


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderUserInfo = () => {
    return (
      <View style={styles.profileContainer}>
        <Avatar
          rounded
          containerStyle={styles.avatarContainer}
          size={75}
          source={require('./../../assets/images/logo.png')}
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Mr {user && (userData.name || user.displayName)}</Text>
          <Text style={styles.userEmail}>{user && user.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ ...styles.container, backgroundColor: isDarkMode ? COLORS.dark : COLORS.white }}>
      <DrawerContentScrollView {...props}>
        {renderUserInfo()}

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuIconContainer} onPress={() => props.navigation.navigate('ProfileScreen')}>
            <Ionicons name="person" size={35} color={isDarkMode ? COLORS.primary : COLORS.primary} />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          {isAdmin ? (
            <TouchableOpacity
              style={styles.menuIconContainer}
              onPress={() => props.navigation.navigate('UserListScreen')}
            >
              <MaterialCommunityIcons
                name="account-group"
                size={35}
                color={isDarkMode ? COLORS.primary : COLORS.primary}
              />
              <Text style={styles.menuText}>User List</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={styles.menuIconContainer} onPress={() => props.navigation.navigate('Cart')}>
            <MaterialCommunityIcons
              name="cart"
              size={35}
              color={isDarkMode ? COLORS.primary : COLORS.primary}
            />
            <Text style={styles.menuText}>Cart History</Text>
          </TouchableOpacity>
        </View>

        <DrawerItem
          // icon={({ color, size }) => <Ionicons name="home" color={color} size={size} />}
          icon={({ color, size }) => (
            <Ionicons
              name="home"
              size={35}
              color={isDarkMode ? COLORS.primary : COLORS.cardbackground}
            />
          )}
          label="Home"
          onPress={() => {
            props.navigation.navigate('HomeScreen');
          }}
          labelStyle={styles.drawerItemLabel}
          iconStyle={styles.shareIcon}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="history"
              size={35}
              color={isDarkMode ? COLORS.primary : COLORS.cardbackground}
            />
          )}
          label="Transaction History"
          onPress={() => {
            props.navigation.navigate('TransactionHistoryScreen');
          }}
          labelStyle={styles.drawerItemLabel}
          iconStyle={styles.shareIcon}
        />

        {isAdmin ? (
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="chart-line"
                size={35}
                color={isDarkMode ? COLORS.primary : COLORS.cardbackground}
              />
            )}
            label="Sales Report"
            onPress={() => {
              props.navigation.navigate('SalesReportScreen');
            }}
            labelStyle={styles.drawerItemLabel}
            iconStyle={styles.shareIcon}
          />
        ) : null}

        {isAdmin ? (
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="chart-line"
                size={35}
                color={isDarkMode ? COLORS.primary : COLORS.cardbackground}
              />
            )}
            label="User List"
            onPress={() => {
              props.navigation.navigate('UserListScreen');
            }}
            labelStyle={styles.drawerItemLabel}
            iconStyle={styles.shareIcon}
          />
        ) : null}

        <DrawerItem
          // icon={({ color, size }) => 
          // <Ionicons name="person" color={color} size={size} />}
          icon={({ color, size }) => (
            <Ionicons
              name="person"
              size={35}
              color={isDarkMode ? COLORS.primary : COLORS.cardbackground}
            />
          )}
          label="Profile"
          onPress={() => {
            props.navigation.navigate('ProfileScreen');
          }}
          labelStyle={styles.drawerItemLabel}
          iconStyle={styles.shareIcon}
        />

        <DrawerItem
          icon={({ color, size }) => <MaterialCommunityIcons name="theme-light-dark" color={color} size={size} />}
          label="Dark Mode"
          onPress={toggleDarkMode}
          labelStyle={styles.drawerItemLabel}
          iconStyle={styles.themeSwitchIcon}
          style={styles.themeSwitchContainer}
        />

        <DrawerItem
          // icon={({ color, size }) => <MaterialCommunityIcons name="logout" color={color} size={size} />}
          icon={({ color, size }) => (
            <Ionicons
              name="person"
              size={35}
              color={isDarkMode ? COLORS.primary : COLORS.cardbackground}
            />
          )}
          label="Sign Out"
          onPress={handleSignOut}
          labelStyle={styles.drawerItemLabel}
          iconStyle={styles.signOutIcon}
          style={styles.signOutContainer}
        />
      </DrawerContentScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.primary,
  },
  avatarContainer: {
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  userInfoContainer: {
    marginLeft: 10,
  },
  userName: {
    color: COLORS.ligth,
    fontSize: 16,
    fontWeight: '900',
  },
  userEmail: {
    color: COLORS.ligth,
    fontSize: 14,
    marginTop: 3,
    fontWeight:'900'
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
    marginTop: 10,
  },
  menuIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    color: COLORS.primary,
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    fontWeight:'900'
  },
  drawerItemLabel: {
    color: COLORS.primary,
    backgroundColor:COLORS.white,
    borderRadius:25,
    padding:5,
  },
  shareIcon: {
    marginRight: 10,
  },
  themeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 0,
    color: COLORS.primary,
    backgroundColor:COLORS.white,
  },
  themeSwitchIcon: {
    marginRight: 10,
  },
  signOutContainer: {
    marginTop: 0,
  },
  signOutIcon: {
    marginRight: 10,
  },
});

export default DrawerContent;
