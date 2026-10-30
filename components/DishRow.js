// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// components/DishRow.js
// one row on the menu list. tapping it will open the Edit screen
// (the screen decides what tapping does, the row just reports the tap)

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../theme/colors';
import { formatPrice } from '../utils/formatPrice';

export default function DishRow({ dish, onPress }) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      accessibilityLabel={`Edit ${dish.dishName}`}
    >
      <View style={styles.rowText}>
        <Text style={styles.dishName}>{dish.dishName}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <Text style={styles.courseTag}>{dish.course}</Text>
      </View>
      <Text style={styles.price}>{formatPrice(dish.price)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // hairline divider under each row instead of boxed cards
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowText: { flex: 1, paddingRight: 12 },
  dishName: { fontFamily: fonts.heading, fontSize: 19, color: colors.text },
  description: { fontFamily: fonts.body, fontSize: 15, color: colors.secondaryText, marginTop: 4 },
  courseTag: {
    fontFamily: fonts.body,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.accent,
    textTransform: 'uppercase',
    marginTop: 6,
  },
  price: { fontFamily: fonts.heading, fontSize: 16, color: colors.priceText },
});