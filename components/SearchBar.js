// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// components/SearchBar.js
// It( hairline) will show a search box with a little ✕ that clears it.
// it doesn't hold the text itself, Home does, I just show it
// and tell Home when it changes

import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/colors';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search dishes…"
        placeholderTextColor={colors.secondaryText}
        accessibilityLabel="Search dishes by name"
        returnKeyType="search"
        autoCorrect={false}
      />

      {/* the ✕ only appears when there's something to clear */}
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          accessibilityLabel="Clear search"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // bigger tap area than the tiny ✕
        >
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // hairline underline instead of a boxed border, same as the form fields
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 8,
  },
  clearText: { fontSize: 16, color: colors.secondaryText, paddingLeft: 8 },
});