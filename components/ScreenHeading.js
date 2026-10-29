// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// components/ScreenHeading.js
// the uppercase heading + champagne underline that every screen had
// copy and pasted from Part 2 - now it's written once and reused

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/colors';

export default function ScreenHeading({ title }) {
  return (
    <View style={styles.headingWrap}>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.underline} />
    </View>
  );
}

const styles = StyleSheet.create({
  headingWrap: { marginTop: 20, marginBottom: 20 },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 24,
    letterSpacing: 2,
    color: colors.text,
    textTransform: 'uppercase',
  },
  underline: { marginTop: 8, height: 2, width: 60, backgroundColor: colors.accent },
});