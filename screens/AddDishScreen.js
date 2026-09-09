// Noluthando Zondi ST10531705 MAST5112 POE PART2
// screens/AddDishScreen.js
// "ADD A DISH" - the form. fill it in, hit save, gets added to the
// menu list back in App.js if it passes validation

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors, fonts } from '../theme/colors';

export default function AddDishScreen({ navigation, addMenuItem }) {
  // one state per field
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter'); // default option
  const [price, setPrice] = useState('');

  // holds validation messages per field, empty object = all good I guess
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // .trim() so a field of just spaces doesn't count as "filled in"
    if (!dishName.trim()) {
      newErrors.dishName = 'Please enter a dish name.';
    }
    if (!description.trim()) {
      newErrors.description = 'Please enter a description.';
    }

    if (!price.trim()) {
      newErrors.price = 'Please enter a price.';
    } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      // checking for non-numbers AND for 0/negative prices, since
      // neither makes sense for a dish
      newErrors.price = 'Price must be a number greater than 0.';
    }

    // no check needed for course cause the Picker always has a valid default selected

    setErrors(newErrors);

    // if newErrors ends up empty, everything's valid
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return; // stop here, errors are already showing

    // parseFloat turns the price text into an actual number before saving
    addMenuItem({
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: parseFloat(price),
    });

    // success popup, then back to Home where the new dish willl show
    Alert.alert('Dish added', `"${dishName.trim()}" was added to the menu.`, [
      { text: 'OK', onPress: () => navigation.navigate('Home') },
    ]);
  };

  return (
    // keeps the form from getting hidden behind the keyboard
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.headingWrap}>
          <Text style={styles.heading}>ADD A DISH</Text>
          <View style={styles.underline} />
        </View>

        {/* dish name */}
        <View style={styles.field}>
          <Text style={styles.label}>DISH NAME</Text>
          <TextInput
            style={styles.input}
            value={dishName}
            onChangeText={setDishName}
            placeholder="e.g. Bobotie"
            placeholderTextColor={colors.secondaryText}
          />
          {errors.dishName ? <Text style={styles.errorText}>{errors.dishName}</Text> : null}
        </View>

        {/* description */}
        <View style={styles.field}>
          <Text style={styles.label}>DESCRIPTION</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Short description of the dish"
            placeholderTextColor={colors.secondaryText}
            multiline
          />
          {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
        </View>

        {/* course - Picker instead of free text so it can't be typed wrong */}
        <View style={styles.field}>
          <Text style={styles.label}>COURSE</Text>
          <View style={styles.pickerWrap}>
            <Picker selectedValue={course} onValueChange={setCourse}>
              <Picker.Item label="Starter" value="Starter" />
              <Picker.Item label="Main Course" value="Main Course" />
              <Picker.Item label="Dessert" value="Dessert" />
            </Picker>
          </View>
        </View>

        {/* price - numeric keyboard, actual validation still happens in validate() */}
        <View style={styles.field}>
          <Text style={styles.label}>PRICE (R)</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="0.00"
            placeholderTextColor={colors.secondaryText}
            keyboardType="numeric"
          />
          {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
        </View>

        {/* TouchableOpacity instead of the default Button so I can
            actually style it to match the Part 1 design */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SAVE DISH</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

      </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: colors.background, padding: 16 },

 headingWrap: { marginTop: 20, marginBottom: 24 },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 22,
    letterSpacing: 2,
    color: colors.text,
    textTransform: 'uppercase',
  },
  underline: { marginTop: 8, height: 2, width: 50, backgroundColor: colors.accent },

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

  saveButton: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    fontFamily: fonts.heading,
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  cancelText: {
    fontFamily: fonts.body,
    textAlign: 'center',
    marginTop: 16,
    color: colors.secondaryText,
    fontSize: 13,
  },
});