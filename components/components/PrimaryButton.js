// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// components/PrimaryButton.js
// one button for the whole app. 'primary' = lavender fill (Save/Update),
// 'danger' = dusty-rose outline (Delete)

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../theme/colors';

export default function PrimaryButton({ title, onPress, variant = 'primary' }) {
  const isDanger = variant === 'danger';

  return (
    <TouchableOpacity
      style={[styles.button, isDanger ? styles.dangerButton : styles.primaryButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, isDanger ? styles.dangerText : styles.primaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButton: { backgroundColor: colors.primary, borderColor: colors.accent },
  dangerButton: { backgroundColor: 'transparent', borderColor: colors.error },
  text: { fontFamily: fonts.heading, fontSize: 14, letterSpacing: 1.5 },
  primaryText: { color: '#FFFFFF' },
  dangerText: { color: colors.error },
});