
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
// import { getAuth, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
// import { auth, firestore } from './../../firebase'; // Replace with your own Firebase initialization code

// const ProfileScreen = () => {
//   const [activeTab, setActiveTab] = useState('view');
//   const [profileData, setProfileData] = useState(null);
//   const [editedProfileData, setEditedProfileData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     setIsLoading(true);
//     try {
//       const user = auth.currentUser;
//       const docRef = doc(firestore, 'users', user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setProfileData(docSnap.data());
//       } else {
//         await createProfileData(user.uid);
//       }
//     } catch (error) {
//       console.error('Error fetching profile data:', error);
//     }
//     setIsLoading(false);
//   };

//   const createProfileData = async (userId) => {
//     try {
//       const userData = {
//         name: '',
//         email: '',
//         phone: '',
//       };
//       const docRef = doc(firestore, 'users', userId);
//       await setDoc(docRef, userData);
//       setProfileData(userData);
//     } catch (error) {
//       console.error('Error creating profile data:', error);
//     }
//   };

//   const updateProfileData = async () => {
//     setIsLoading(true);
//     try {
//       const user = auth.currentUser;
//       const docRef = doc(firestore, 'users', user.uid);
//       await updateDoc(docRef, editedProfileData);
//       setProfileData(editedProfileData);
//       setEditedProfileData({});
//     } catch (error) {
//       console.error('Error updating profile data:', error);
//       setErrorMessage('Failed to update profile data.');
//     }
//     setIsLoading(false);
//     setIsEditing(false);
//   };

//   const handleTabPress = async (tabName) => {
//     if (activeTab === 'edit' && tabName === 'view') {
//       await updateProfileData();
//     }
//     setActiveTab(tabName);
//   };

//   const renderViewTab = () => (
//     <View style={styles.cardContainer}>
//       <Text style={styles.label}>Name:</Text>
//       <Text style={styles.value}>{profileData?.name}</Text>
//       <Text style={styles.label}>Email:</Text>
//       <Text style={styles.value}>{profileData?.email}</Text>
//       <Text style={styles.label}>Phone:</Text>
//       <Text style={styles.value}>{profileData?.phone}</Text>
//     </View>
//   );

//   const renderEditTab = () => (
//     <View style={styles.cardContainer}>
//       <Text style={styles.label}>Name:</Text>
//       <TextInput
//         style={styles.input}
//         value={editedProfileData.name}
//         onChangeText={(text) => setEditedProfileData((prevData) => ({ ...prevData, name: text }))}
//       />
//       <Text style={styles.label}>Email:</Text>
//       <TextInput
//         style={styles.input}
//         value={editedProfileData.email}
//         onChangeText={(text) => setEditedProfileData((prevData) => ({ ...prevData, email: text }))}
//       />
//       <Text style={styles.label}>Phone:</Text>
//       <TextInput
//         style={styles.input}
//         value={editedProfileData.phone}
//         onChangeText={(text) => setEditedProfileData((prevData) => ({ ...prevData, phone: text }))}
//       />
//       <TouchableOpacity style={styles.saveButton} onPress={() => handleTabPress('view')}>
//         <Text style={styles.saveButtonText}>Save Changes</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.tabsContainer}>
//         <TouchableOpacity
//           style={[styles.tabButton, activeTab === 'view' && styles.activeTabButton]}
//           onPress={() => handleTabPress('view')}
//         >
//           <Text style={[styles.tabButtonText, activeTab === 'view' && styles.activeTabButtonText]}>View Profile</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tabButton, activeTab === 'edit' && styles.activeTabButton]}
//           onPress={() => handleTabPress('edit')}
//         >
//           <Text style={[styles.tabButtonText, activeTab === 'edit' && styles.activeTabButtonText]}>Edit Profile</Text>
//         </TouchableOpacity>
//       </View>
//       {isLoading ? (
//         <ActivityIndicator style={styles.loadingIndicator} size="large" color="#000" />
//       ) : (
//         <>
//           {activeTab === 'view' ? renderViewTab() : renderEditTab()}
//           {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#2B60DA',
//   },
//   cardContainer: {
//     backgroundColor: '#FFF',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     padding: 20,
//     borderRadius: 10,
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     backgroundColor: '#ccc',
//     borderRadius: 10,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   activeTabButton: {
//     backgroundColor: '#4CAF50',
//   },
//   tabButtonText: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   activeTabButtonText: {
//     color: '#fff',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   value: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   input: {
//     backgroundColor: '#CCC',
//     color: '#000000',
//     borderRadius: 50,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     marginTop: 10,
//     textAlign: 'center',
//   },
// });

// export default ProfileScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { getAuth, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from './../../firebase'; // Replace with your own Firebase initialization code

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [profileData, setProfileData] = useState(null);
  const [editedProfileData, setEditedProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      const docRef = doc(firestore, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
        setEditedProfileData(docSnap.data()); // Set editedProfileData to initialize with the existing profile data
      } else {
        await createProfileData(user.uid);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
    setIsLoading(false);
  };

  const createProfileData = async (userId) => {
    try {
      const userData = {
        name: '',
        email: '',
        phone: '',
      };
      const docRef = doc(firestore, 'users', userId);
      await setDoc(docRef, userData);
      setProfileData(userData);
      setEditedProfileData(userData); // Set editedProfileData to initialize with the created profile data
    } catch (error) {
      console.error('Error creating profile data:', error);
    }
  };

  const updateProfileData = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      const docRef = doc(firestore, 'users', user.uid);
      await updateDoc(docRef, editedProfileData);
      setProfileData(editedProfileData);
      setEditedProfileData({});
    } catch (error) {
      console.error('Error updating profile data:', error);
      setErrorMessage('Failed to update profile data.');
    }
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleTabPress = async (tabName) => {
    if (activeTab === 'edit' && tabName === 'view') {
      await updateProfileData();
    }
    setActiveTab(tabName);
  };

  const renderViewTab = () => (
    <View style={styles.cardContainer}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{profileData?.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{profileData?.email}</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{profileData?.phone}</Text>
    </View>
  );

  const renderEditTab = () => (
    <View style={styles.cardContainer}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={editedProfileData.name}
        onChangeText={(text) => setEditedProfileData((prevData) => ({ ...prevData, name: text }))}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={editedProfileData.email}
        onChangeText={(text) => setEditedProfileData((prevData) => ({ ...prevData, email: text }))}
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={editedProfileData.phone}
        onChangeText={(text) => setEditedProfileData((prevData) => ({ ...prevData, phone: text }))}
      />
      <TouchableOpacity style={styles.saveButton} onPress={() => handleTabPress('view')}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'view' && styles.activeTabButton]}
          onPress={() => handleTabPress('view')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'view' && styles.activeTabButtonText]}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'edit' && styles.activeTabButton]}
          onPress={() => handleTabPress('edit')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'edit' && styles.activeTabButtonText]}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#000" />
      ) : (
        <>
          {activeTab === 'view' ? renderViewTab() : renderEditTab()}
          {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2B60DA',
  },
  cardContainer: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    borderRadius: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: '#4CAF50',
  },
  tabButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#CCC',
    color: '#000000',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ProfileScreen;
