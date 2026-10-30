// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// components/DishForm.js
// THE form. Add and Edit both use thiis exact component, the only
// difference is what I pass in (empty vs pre-filled, button text).
// it handles its own typing + vallidation, then hands the clean
// dish back to the screen through onSubmit

import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FormField from './FormField';
import PrimaryButton from './PrimaryButton';
import { colors, fonts } from '../theme/colors';
import { COURSES } from '../constants/courses';
import { validateDish, parsePrice } from '../utils/validateDish';

// what an empty form starts as (used by the Add screen)
const EMPTY_DISH = { dishName: '', description: '', course: COURSES[0], price: '' };

export default function DishForm({
  initialDish = EMPTY_DISH,
  submitLabel,
  onSubmit,
  onCancel,
  otherDishNames = [], // names of the OTHER dishes, for the duplicate check (just if it shows again)
  children,            // extra stuff under the main button (the Delete button)
}) {
  const [dishName, setDishName] = useState(initialDish.dishName);
  const [description, setDescription] = useState(initialDish.description);
  const [course, setCourse] = useState(initialDish.course);
  const [price, setPrice] = useState(String(initialDish.price)); // inputs need text, not a number
  const [errors, setErrors] = useState({});

  // true if anything on the form is different from how it started
  const hasChanges =
    dishName !== initialDish.dishName ||
    description !== initialDish.description ||
    course !== initialDish.course ||
    price !== String(initialDish.price);

  const handleSubmit = () => {
    const foundErrors = validateDish({ dishName, description, price }, otherDishNames);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return; // stop, errors are showing

    // hand back a clean dish: cut smaller text + price as a real number
    onSubmit({
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: parsePrice(price),
    });
  };

  const handleCancel = () => {
    // nothing typed or changed? just leave it. nje otherwise doublec heck first
    if (!hasChanges) {
      onCancel();
      return;
    }
    Alert.alert('Discard changes?', "Your changes haven't been saved.", [
      { text: 'Keep editing', style: 'cancel' },
      { text: 'Discard', style: 'destructive', onPress: onCancel },
    ]);
  };

  return (
    <>
      <FormField
        label="Dish name"
        value={dishName}
        onChangeText={setDishName}
        placeholder="e.g. Bobotie"
        error={errors.dishName}
      />

      <FormField
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Short description of the dish"
        multiline
        error={errors.description}
      >
      </FormField>

      {/* course - Picker instead of free text so it can't be typed wrong */}
      <FormField label="Course">
        <Picker selectedValue={course} onValueChange={setCourse}>
          {COURSES.map((courseName) => (
            <Picker.Item key={courseName} label={courseName} value={courseName} />
          ))}
        </Picker>
      </FormField>

      <FormField
        label="Price (R)"
        value={price}
        onChangeText={setPrice}
        placeholder="0.00"
        keyboardType="numeric"
        error={errors.price}
      />

      <PrimaryButton title={submitLabel} onPress={handleSubmit} />

      {children}

      <TouchableOpacity onPress={handleCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  cancelText: {
    fontFamily: fonts.body,
    textAlign: 'center',
    marginTop: 16,
    color: colors.secondaryText,
    fontSize: 13,
  },
});