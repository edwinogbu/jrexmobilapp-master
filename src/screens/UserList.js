import React, { useEffect, useState } from 'react';
// import { db, auth, collection, doc, docs, getDocs  } from '../components/config';
import { auth, firestore, collection, doc, docs, getDocs  } from './../../firebase';

import { FlatList } from 'react-native';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.email}</Text>
          <Text>{item.id}</Text>
        </View>
      )}
    />
  );
};

export default UserList;
