// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// components/StatRow.js
// one line on the Statistics screen: label on the left, value on the right.
// reusing it for every stat so they all look the same

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/colors';

export default function StatRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // hairline divider under each row, same as the dish list
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  label: { fontFamily: fonts.body, fontSize: 15, color: colors.secondaryText },
  value: { fontFamily: fonts.heading, fontSize: 22, color: colors.text },
});