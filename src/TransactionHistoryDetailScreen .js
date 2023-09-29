import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Image } from 'react-native';
import COLORS from './global/LandingColors';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const TransactionHistoryDetailScreen = ({ route }) => {
  const { transaction } = route.params;

  const handleShare = async () => {
    try {
      // Generate a PDF of the transaction details
      const pdfUri = await generatePDF();

      // Share the generated PDF
      await shareAsync(pdfUri);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = async () => {
    try {
      // Create an HTML template for the PDF content
      const html = `
        <html>
          <head>
            <style>
              /* Add your PDF styling here */
            </style>
          </head>
          <body>
            <div>
              <h1>Transaction Details</h1>
              <p>ID: ${transaction.id}</p>
              <p>Date: ${transaction.date}</p>
              <h2>Items:</h2>
              <ul>
                ${transaction.items
                  .map(
                    (item) => `<li>${item.name} (Quantity: ${item.quantity})</li>`
                  )
                  .join('')}
              </ul>
              <p>Amount: ${transaction.totalAmount}</p>
            </div>
          </body>
        </html>
      `;

      // Generate a PDF from the HTML template
      const pdfFile = await printToFileAsync({
        html: html,
        width: 612, // Standard US Letter width (8.5 inches)
        height: 792, // Standard US Letter height (11 inches)
      });

      return pdfFile.uri;
    } catch (error) {
      console.log('Error generating PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Transaction Details</Text>
        <Text style={styles.label}>ID: {transaction.userId}</Text>
        <Text style={styles.label}>Date: {transaction.date}{`\n`}</Text>

        <View style={styles.itemsContainer}>
          <Text style={styles.label}>Items Ordered:</Text>
          {transaction.items.map((item, index) => (
            <View key={index} style={{...styles.item, flexDirection:'row'}}>
              <Text style={styles.itemName}> {item.name} </Text>
              <Text style={styles.itemQuantity}> Quantity: {item.quantity}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.label}>Amount: {transaction.totalAmount}</Text>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareText}>Share as PDF</Text>
        </TouchableOpacity>
      </View>
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
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemsContainer: {
    marginBottom: 10,
  },
  item: {
    marginBottom: 5,
  },
  itemName: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: '#2B60DA',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  shareText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TransactionHistoryDetailScreen;


// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Share } from 'react-native';
// import COLORS from './global/LandingColors';

// const TransactionHistoryDetailScreen = ({ route }) => {
//   const { transaction } = route.params;

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `Transaction Details\nID: ${transaction.id}\nDate: ${transaction.date}\nItems:\n${getItemsString(transaction.items)}\nAmount: ${transaction.amount}`,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getItemsString = (items) => {
//     return items.map(item => `${item.name} (Quantity: ${item.quantity})`).join('\n');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Transaction Details</Text>
//         <Text style={styles.label}>ID:{transaction.id}</Text>

//         <Text style={styles.value}>{transaction.id}</Text>
//         <Text style={styles.label}>Date:</Text>
//         <Text style={styles.value}>{transaction.date}</Text>
//         <Text style={styles.label}>Items:</Text>
//         <View style={styles.itemsContainer}>
//           {transaction.items.map((item, index) => (
//             <View key={index} style={styles.item}>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
//             </View>
//           ))}
//         </View>
//         <Text style={styles.label}>Amount:</Text>
//         <Text style={styles.value}>{transaction.totalAmount}</Text>
//         <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
//           <Text style={styles.shareText}>Share</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:COLORS.ligth,
//     padding: 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   value: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight:'900'
//   },
//   itemsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 10,
//   },
//   item: {
//     width: '50%',
//     marginBottom: 10,
//   },
//   itemName: {
//     fontSize: 14,
//     marginBottom: 5,
//     fontWeight: 'bold',
//   },
//   itemQuantity: {
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   shareButton: {
//     backgroundColor: '#2B60DA',
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 20,
//   },
//   shareText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default TransactionHistoryDetailScreen;
