// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// components/FormField.js
// label + input + red error text, all in one. in Part 2 I wrote this
// this block 3 times, now it's written once.
// if I pass children (like the Picker) it shows those instead of a TextInput

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/colors';

export default function FormField({ label, error, multiline, children, ...inputProps }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      {children ? (
        <View style={styles.pickerWrap}>{children}</View>
      ) : (
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          placeholderTextColor={colors.secondaryText}
          multiline={multiline}
          accessibilityLabel={label}
          {...inputProps}
        />
      )}

      {/* only shows when validation found a problem with this field */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 22 },
  label: {
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: 1.2,
    color: colors.secondaryText,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  // hairline underline instead of a boxed border, matches Part 1 rules
  input: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    paddingVertical: 6,
  },
  multilineInput: { minHeight: 50, textAlignVertical: 'top' },
  pickerWrap: { borderBottomWidth: 1, borderBottomColor: colors.accent },
  errorText: { fontFamily: fonts.body, color: colors.error, fontSize: 12, marginTop: 4 },
});