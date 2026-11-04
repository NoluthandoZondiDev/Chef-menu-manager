// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// screens/AddDishScreen.js
// "ADD A DISH" - the form lives in DishForm, so this screen just says
// what happens when it's saved. I can also pick a suggested dish to
// pre fill the form (it still has to pass validation before it's saved)

import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, Alert, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeading from '../components/ScreenHeading';
import DishForm from '../components/DishForm';
import SuggestedDishesModal from '../components/SuggestedDishesModal';
import { colors, fonts } from '../theme/colors';

export default function AddDishScreen({ navigation, menuItems, addMenuItem }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedDish, setSuggestedDish] = useState(null); // null = empty form
  const [formKey, setFormKey] = useState(0);

  const goHome = () => navigation.navigate('Home');
  const dishNames = menuItems.map((dish) => dish.dishName);

  // fill the form with the dish I tapped. changing the key makes DishForm
  // start fresh with the new values (it only reads them once)
  const handleSelectSuggestion = (dish) => {
    setSuggestedDish(dish);
    setFormKey((currentKey) => currentKey + 1);
    setShowSuggestions(false);
  };

  const handleSubmit = (newDish) => {
    addMenuItem(newDish);
    Alert.alert('Dish added', `"${newDish.dishName}" was added to the menu.`, [
      { text: 'OK', onPress: goHome },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <ScreenHeading title="ADD A DISH" />

          <TouchableOpacity
            onPress={() => setShowSuggestions(true)}
            accessibilityLabel="Choose from suggested dishes"
          >
            <Text style={styles.suggestLink}>Choose from suggested dishes</Text>
          </TouchableOpacity>

          <DishForm
            key={formKey}
            initialDish={suggestedDish || undefined}
            submitLabel="SAVE DISH"
            onSubmit={handleSubmit}
            onCancel={goHome}
            otherDishNames={dishNames}
          />
        </ScrollView>

        <SuggestedDishesModal
          visible={showSuggestions}
          existingDishNames={dishNames}
          onSelect={handleSelectSuggestion}
          onClose={() => setShowSuggestions(false)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: 16 },
  suggestLink: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text,
    textDecorationLine: 'underline',
    marginBottom: 22,
  },
});