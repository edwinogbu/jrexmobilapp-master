import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, firestore } from './../../firebase';
import COLORS from '../global/LandingColors';

const TransactionHistoryScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async (userId) => {
    try {
      const transactionsRef = collection(firestore, 'checkouts');
      const querySnapshot = await getDocs(query(transactionsRef, where('userId', '==', userId)));
      const transactionData = querySnapshot.docs.map(doc => doc.data());
      setTransactions(transactionData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      const userEmail = user.email;
      fetchUserId(userEmail).then(userId => {
        if (userId) {
          fetchTransactions(userId);
        } else {
          setIsLoading(false); // Handle the case where the user is not found
        }
      });
    } else {
      setIsLoading(false); // Handle the case where there's no authenticated user
    }
  }, []);

  const renderTransactionItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TransactionHistoryDetailScreen', { transaction: item })}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardDate}>{item.date}</Text>
          <Text style={styles.cardAmount}>{item.totalAmount}</Text>
          <Text style={styles.cardDescription}>{item.paymentStatus}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.itemRow}>
            {item.items.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text> // Show a loading indicator while fetching data
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={renderTransactionItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardDate: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardAmount: {
    fontSize: 16,
  },
  cardBody: {},
  cardDescription: {
    fontSize: 14,
    color: '#999ccc',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
  },
});

export default TransactionHistoryScreen;



// import React, { useState, useEffect } from 'react';
// import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { auth, firestore } from './../../firebase';

// import COLORS from '../global/LandingColors';

// const TransactionHistoryScreen = ({ navigation }) => {
//   const [transactions, setTransactions] = useState([]);
  

// // useEffect(() => {
// //   const fetchTransactions = async () => {
// //     try {
// //       // const userId = 'yourUserId'; // Replace with the actual userId you want to filter by
// //       const transactionsRef = collection(firestore, 'checkouts');
// //       const query = query(transactionsRef, where('userId', '==', userId)); // Add a where clause to filter by userId
// //       const transactionsSnapshot = await getDocs(query);
// //       const transactionData = transactionsSnapshot.docs.map(doc => doc.data());
// //       setTransactions(transactionData);
// //     } catch (error) {
// //       console.error('Error fetching transactions:', error);
// //     }
// //   };

// //   fetchTransactions();
// // }, []);



//   // useEffect(() => {
//   //   const fetchTransactions = async () => {
//   //     try {
//   //       const transactionsRef = collection(firestore, 'checkouts');
//   //       const transactionsSnapshot = await getDocs(transactionsRef);
//   //       const transactionData = transactionsSnapshot.docs.map(doc => doc.data());
//   //       setTransactions(transactionData);
//   //     } catch (error) {
//   //       console.error('Error fetching transactions:', error);
//   //     }
//   //   };

//   //   fetchTransactions();
//   // }, []);


//   // Define the fetchUserId function
// const fetchUserId = async (userEmail) => {
//   const usersCollection = collection(firestore, 'users');
//   const querySnapshot = await getDocs(
//     query(usersCollection, where('email', '==', userEmail))
//   );

//   if (!querySnapshot.empty) {
//     const userDoc = querySnapshot.docs[0];
//     return userDoc.id; // Return the user's ID
//   }

//   return null; // Return null if the user is not found
// };



//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const user = auth.currentUser;

//         if (user) {
//           const userEmail = user.email;
//           const userId = await fetchUserId(userEmail);

//           if (userId) {
//             const transactionsRef = collection(firestore, 'checkouts');
//             const query = query(transactionsRef, where('userId', '==', userId));
//             const transactionsSnapshot = await getDocs(query);
//             const transactionData = transactionsSnapshot.docs.map(doc => doc.data());
//             setTransactions(transactionData);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   const renderTransactionItem = ({ item }) => {
//     return (
//       <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TransactionHistoryDetailScreen', { transaction: item })}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.cardDate}>{item.date}</Text>
//           <Text style={styles.cardAmount}>{item.totalAmount}</Text>
//           <Text style={styles.cardDescription}>{item.paymentStatus}</Text>
//           <Text style={styles.cardDescription}>{item.description}</Text>
//         </View>

//         <View style={styles.cardBody}>
//           <View style={styles.itemRow}>
//             {item.items.map((item, index) => (
//               <View key={index} style={{}}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={transactions}
//         keyExtractor={item => item.id}
//         renderItem={renderTransactionItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.light,
//     padding: 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 2,
//     padding: 15,
//     marginBottom: 10,
//     shadowColor: '#fff',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   cardDate: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   cardAmount: {
//     fontSize: 16,
//   },
//   cardBody: {},
//   cardDescription: {
//     fontSize: 14,
//     color: '#999ccc',
//   },
//   itemRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   itemContainer: {
//     flex: 1,
//     marginRight: 10,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   itemQuantity: {
//     fontSize: 14,
//   },
// });

// export default TransactionHistoryScreen;
