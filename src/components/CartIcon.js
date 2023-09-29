import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CartContext } from '../CartContext';
import { Icon, withBadge } from 'react-native-elements';
import { colors, parameters } from '../global/styles';
import COLORS from './../global/LandingColors';

export function CartIcon({ navigation }) {
  const { getItemsCount } = useContext(CartContext);
  const count = getItemsCount();
  const BadgeIcon = withBadge(count)(Icon);

  return (
    <View style={styles.container}>
      <View style={{ alignContent: 'center', justifyContent: 'center', marginRight: 15 }}>
        <BadgeIcon
          type="material-community"
          name="cart"
          size={35}
          color={colors.cardbackground}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
        {/* <Text
          onPress={() => {
            navigation.navigate('Cart');
          }}
        >
          Cart ({count})
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor:COLORS.primary,
    height: 42,
    padding: 12,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
