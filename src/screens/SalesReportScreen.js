import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db, auth, firestore } from './../../firebase';

const SalesReportScreen = ({ navigation }) => {
  const [checkoutData, setCheckoutData] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const checkoutCollectionRef = collection(db, 'checkouts');
        let q = query(checkoutCollectionRef, orderBy('date', 'desc'));

        if (startDate && endDate) {
          q = query(
            checkoutCollectionRef,
            orderBy('date', 'desc'),
            where('date', '>=', startDate),
            where('date', '<=', endDate)
          );
        }

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          items: doc.data().items || [],
          date: doc.data().date,
          paymentStatus: doc.data().paymentStatus,
        }));

        setCheckoutData(data);
      } catch (error) {
        console.log('Error fetching checkout data:', error);
      }
    };

    fetchCheckoutData();
  }, [startDate, endDate]);

  const handleRowPress = (item) => {
    navigation.navigate('SalesReportDetailScreen', { checkoutId: item.id });
  };

  const handleFilterPress = () => {
    setDatePickerVisible(true);
  };

  const handleDateConfirm = (date) => {
    if (!startDate) {
      setStartDate(date);
    } else if (!endDate) {
      setEndDate(date);
    }

    setDatePickerVisible(false);
  };

  const handleDateCancel = () => {
    setDatePickerVisible(false);
  };

  const renderTableHeader = () => {
    const tableHead = ['SN', 'Items', 'Date', 'Status'];

    return (
      <Row
        data={tableHead}
        style={styles.tableHeader}
        textStyle={styles.headerText}
      />
    );
  };

//   const renderTableRow = ({ item, index }) => {
//     const itemNames = item.items ? item.items.map((item) => item.name).join(', ') : '';
//     const rowData = [index + 1, itemNames, item.date, item.paymentStatus];

//     const rowStyle = index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd;

//     return (
//       <TouchableOpacity key={item.id} onPress={() => handleRowPress(item)}>
//         <Row data={rowData} style={rowStyle} textStyle={styles.rowText} />
//       </TouchableOpacity>
//     );
//   };

const renderTableRow = ({ item, index }) => {
    const itemNames = item.items ? item.items.map((item) => item.name).join(', ') : '';
    const rowData = [index + 1, itemNames, item.date, item.paymentStatus];
  
    return (
      <TouchableOpacity key={item.id} onPress={() => handleRowPress(item)}>
        <Row
          data={rowData}
          style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
          textStyle={styles.rowText} // Modify this line
        />
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.datePicker} onPress={handleFilterPress}>
          <Text style={{...styles.datePickerText, color:'#2B60DA'}}>Start</Text>
          <Text style={styles.datePickerText}>
            {startDate ? startDate.toDateString() : 'Select Start Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.datePicker} onPress={handleFilterPress}>
        <Text style={{...styles.datePickerText, color:'#2B60DA'}}>End</Text>
          <Text style={styles.datePickerText}>
            {endDate ? endDate.toDateString() : 'Select End Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={handleDateCancel}
        />
      </View>
      <Table style={styles.table}>
        {renderTableHeader()}
        {checkoutData.map((item, index) => renderTableRow({ item, index }))}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  datePicker: {
    flex: 1,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  datePickerText: {
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#2374AB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  table: {
    flex: 1,
    backgroundColor: '#f1f8ff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    height: 40,
    backgroundColor: '#2374AB',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    padding: 5,
  },
  tableRowEven: {
    height: 40,
    backgroundColor: '#E6F4FF',
    borderBottomWidth: 1,
    borderBottomColor: '#BDD7F0',
  },
  tableRowOdd: {
    height: 40,
    backgroundColor: '#F7FAFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDEAFF',
  },
  rowText: {
    textAlign: 'center',
    padding: 5,
    color: '#333',
    fontSize: 14,
  },
});

export default SalesReportScreen;


// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Table, Row } from 'react-native-table-component';
// import { useNavigation } from '@react-navigation/native';
// import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
// import { db, auth, firestore } from './../../firebase';

// const SalesReportScreen = ({ navigation }) => {
//   const [checkoutData, setCheckoutData] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   useEffect(() => {
//     const fetchCheckoutData = async () => {
//       try {
//         const checkoutCollectionRef = collection(db, 'checkouts');
//         let q = query(checkoutCollectionRef, orderBy('date', 'desc'));

//         if (startDate && endDate) {
//           q = query(
//             checkoutCollectionRef,
//             orderBy('date', 'desc'),
//             where('date', '>=', startDate),
//             where('date', '<=', endDate)
//           );
//         }

//         const querySnapshot = await getDocs(q);

//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           items: doc.data().items || [],
//           date: doc.data().date,
//           paymentStatus: doc.data().paymentStatus,
//         }));

//         setCheckoutData(data);
//       } catch (error) {
//         console.log('Error fetching checkout data:', error);
//       }
//     };

//     fetchCheckoutData();
//   }, [startDate, endDate]);

//   const handleRowPress = (item) => {
//     navigation.navigate('SalesReportDetailScreen', { checkoutId: item.id });
//   };

//   const handleFilterPress = () => {
//     // Perform filtering based on selected date range
//     // Set the startDate and endDate states
//   };

//   const renderTableHeader = () => {
//     const tableHead = ['SN', 'Items', 'Date', 'Status'];

//     return (
//       <Row
//         data={tableHead}
//         style={styles.tableHeader}
//         textStyle={styles.headerText}
//       />
//     );
//   };

//   const renderTableRow = ({ item, index }) => {
//     const itemNames = item.items ? item.items.map((item) => item.name).join(', ') : '';
//     const rowData = [index + 1, itemNames, item.date, item.paymentStatus];

//     const rowStyle = index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd;

//     return (
//       <TouchableOpacity key={item.id} onPress={() => handleRowPress(item)}>
//         <Row data={rowData} style={rowStyle} textStyle={styles.rowText} />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterContainer}>
//         {/* Date picker components for selecting start and end dates */}
//         {/* Set the selected dates to the startDate and endDate states */}
//         {/* Add appropriate styling and props for date selection */}
//       </View>
//       <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
//         <Text style={styles.filterButtonText}>Filter</Text>
//       </TouchableOpacity>
//       <Table style={styles.table}>
//         {renderTableHeader()}
//         {checkoutData.map((item, index) => renderTableRow({ item, index }))}
//       </Table>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   filterButton: {
//     backgroundColor: '#2374AB',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignSelf: 'flex-end',
//   },
//   filterButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   table: {
//     flex: 1,
//     backgroundColor: '#f1f8ff',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   tableHeader: {
//     height: 40,
//     backgroundColor: '#2374AB',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#fff',
//     padding: 5,
//   },
//   tableRowEven: {
//     height: 40,
//     backgroundColor: '#E6F4FF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#BDD7F0',
//   },
//   tableRowOdd: {
//     height: 40,
//     backgroundColor: '#F7FAFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#DDEAFF',
//   },
//   rowText: {
//     textAlign: 'center',
//     padding: 5,
//     color: '#333',
//     fontSize: 14,
//   },
// });

// export default SalesReportScreen;


// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Table, Row } from 'react-native-table-component';
// import { useNavigation } from '@react-navigation/native';
// import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
// import { db, auth, firestore } from './../../firebase';

// const SalesReportScreen = ({ navigation }) => {
//   const [checkoutData, setCheckoutData] = useState([]);

//   useEffect(() => {
//     const fetchCheckoutData = async () => {
//       try {
//         const checkoutCollectionRef = collection(db, 'checkouts');
//         const q = query(checkoutCollectionRef, orderBy('date', 'desc'));
//         const querySnapshot = await getDocs(q);

//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           items: doc.data().items || [],
//           date: doc.data().date,
//           paymentStatus: doc.data().paymentStatus,
//         }));

//         setCheckoutData(data);
//       } catch (error) {
//         console.log('Error fetching checkout data:', error);
//       }
//     };

//     fetchCheckoutData();
//   }, []);

//   const handleRowPress = (item) => {
//     navigation.navigate('SalesReportDetailScreen', { checkoutId: item.id });
//   };

//   const renderTableHeader = () => {
//     const tableHead = ['SN', 'Items', 'Date', 'Status'];

//     return (
//       <Row
//         data={tableHead}
//         style={styles.tableHeader}
//         textStyle={styles.headerText}
//       />
//     );
//   };

//   const renderTableRow = ({ item, index }) => {
//     const itemNames = item.items ? item.items.map((item) => item.name).join(', ') : '';
//     const rowData = [index + 1, itemNames, item.date, item.paymentStatus];

//     const rowStyle = index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd;

//     return (
//       <TouchableOpacity key={item.id} onPress={() => handleRowPress(item)}>
//         <Row data={rowData} style={rowStyle} textStyle={styles.rowText} />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Table style={styles.table}>
//         {renderTableHeader()}
//         {checkoutData.map((item, index) => renderTableRow({ item, index }))}
//       </Table>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   table: {
//     flex: 1,
//     backgroundColor: '#f1f8ff',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   tableHeader: {
//     height: 40,
//     backgroundColor: '#2374AB',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#fff',
//     padding: 5,
//     textTransform: 'uppercase',
//   },
//   tableRowEven: {
//     height: 50,
//     backgroundColor: '#E6F4FF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#BDD7F0',
//   },
//   tableRowOdd: {
//     height: 50,
//     backgroundColor: '#F1F9FF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#BDD7F0',
//   },
//   rowText: {
//     textAlign: 'center',
//     padding: 5,
//     color: '#333',
//     fontSize: 14,
//   },
// });

// export default SalesReportScreen;


// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Table, Row } from 'react-native-table-component';
// import { useNavigation } from '@react-navigation/native';
// import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
// import { db, auth, firestore } from './../../firebase';

// const SalesReportScreen = ({ navigation }) => {
//   const [checkoutData, setCheckoutData] = useState([]);

//   useEffect(() => {
//     const fetchCheckoutData = async () => {
//       try {
//         const checkoutCollectionRef = collection(db, 'checkouts');
//         const q = query(checkoutCollectionRef, orderBy('date', 'desc'));
//         const querySnapshot = await getDocs(q);

//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           items: doc.data().items || [],
//           date: doc.data().date,
//           paymentStatus: doc.data().paymentStatus,
//         }));

//         setCheckoutData(data);
//       } catch (error) {
//         console.log('Error fetching checkout data:', error);
//       }
//     };

//     fetchCheckoutData();
//   }, []);

//   const handleRowPress = (item) => {
//     navigation.navigate('SalesReportDetailScreen', { checkoutId: item.id });
//   };

//   const renderTableHeader = () => {
//     const tableHead = ['SN', 'Items', 'Date', 'Status'];

//     return (
//       <Row
//         data={tableHead}
//         style={styles.tableHeader}
//         textStyle={styles.headerText}
//       />
//     );
//   };

//   const renderTableRow = ({ item, index }) => {
//     const itemNames = item.items ? item.items.map((item) => item.name).join(', ') : '';
//     const rowData = [index + 1, itemNames, item.date, item.paymentStatus];

//     return (
//       <TouchableOpacity key={item.id} onPress={() => handleRowPress(item)}>
//         <Row data={rowData} style={styles.tableRow} textStyle={styles.rowText} />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Table style={styles.table}>
//         {renderTableHeader()}
//         {checkoutData.map((item, index) => renderTableRow({ item, index }))}
//       </Table>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   table: {
//     flex: 1,
//     backgroundColor: '#f1f8ff',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   tableHeader: {
//     height: 40,
//     backgroundColor: '#2374AB',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#fff',
//     padding: 5,
//     textTransform: 'uppercase',
//   },
//   tableRow: {
//     height: 50,
//     backgroundColor: '#E6F4FF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#BDD7F0',
//   },
//   rowText: {
//     textAlign: 'center',
//     padding: 5,
//     color: '#333',
//     fontSize: 14,
//   },
// });

// export default SalesReportScreen;


// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Table, Row } from 'react-native-table-component';
// import { useNavigation } from '@react-navigation/native';
// import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
// import { db, auth, firestore } from './../../firebase';

// const SalesReportScreen = ({ navigation }) => {
//   const [checkoutData, setCheckoutData] = useState([]);

//   useEffect(() => {
//     const fetchCheckoutData = async () => {
//       try {
//         const checkoutCollectionRef = collection(db, 'checkouts');
//         const q = query(checkoutCollectionRef, orderBy('date', 'desc'));
//         const querySnapshot = await getDocs(q);

//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           items: doc.data().items || [],
//           date: doc.data().date,
//           paymentStatus: doc.data().paymentStatus,
//         }));

//         setCheckoutData(data);
//       } catch (error) {
//         console.log('Error fetching checkout data:', error);
//       }
//     };

//     fetchCheckoutData();
//   }, []);

//   const handleRowPress = (item) => {
//     navigation.navigate('SalesReportDetailScreen', { checkoutId: item.id });
//   };

//   const renderTableHeader = () => {
//     const tableHead = ['SN', 'Items', 'Date', 'Status'];

//     return (
//       <Row
//         data={tableHead}
//         style={styles.tableHeader}
//         textStyle={styles.headerText}
//       />
//     );
//   };

//   const renderTableRow = ({ item, index }) => {
//     const itemNames = item.items ? item.items.map((item) => item.name).join(', ') : '';
//     const rowData = [index + 1, itemNames, item.date, item.paymentStatus];

//     return (
//       <TouchableOpacity key={item.id} onPress={() => handleRowPress(item)}>
//         <Row data={rowData} style={styles.tableRow} textStyle={styles.rowText} />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Table style={styles.table}>
//         {renderTableHeader()}
//         {checkoutData.map((item, index) => renderTableRow({ item, index }))}
//       </Table>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   table: {
//     flex: 1,
//     backgroundColor: '#f1f8ff',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   tableHeader: {
//     height: 40,
//     backgroundColor: '#2374AB',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#fff',
//     padding: 5,
//   },
//   tableRow: {
//     height: 40,
//     backgroundColor: '#E6F4FF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#BDD7F0',
//   },
//   rowText: {
//     textAlign: 'center',
//     padding: 5,
//     color: '#333',
//   },
// });

// export default SalesReportScreen;
