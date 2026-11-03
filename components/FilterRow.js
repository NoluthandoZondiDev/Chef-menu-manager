// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// components/FilterRow.js
// "All | Starters | Mains | Desserts" row. the picked one is dark
// with a champagne underline, the rest are muted.
// the options come from constants/courses.js so the names always match

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/colors';
import { FILTER_OPTIONS } from '../constants/courses';

export default function FilterRow({ selected, onSelect }) {
  return (
    <View style={styles.row}>
      {FILTER_OPTIONS.map((option) => {
        const isSelected = option.value === selected;

        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={[styles.option, isSelected && styles.optionSelected]}
            accessibilityLabel={`Show ${option.label}`}
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={[styles.text, isSelected && styles.textSelected]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 8 },
  option: {
    marginRight: 20,
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent', // invisible, so the row doesn't jump when one gets selected
  },
  optionSelected: { borderBottomColor: colors.accent },
  text: {
    fontFamily: fonts.body,
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.secondaryText,
  },
  textSelected: { color: colors.text },
});