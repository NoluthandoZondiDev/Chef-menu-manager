// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// screens/AddDishScreen.js
// "ADD A DISH" has 200 lines in Part 2, now the form lives in
// DishForm so this screen just says what happens when it's saved

import React from 'react';
import { StyleSheet, ScrollView, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeading from '../components/ScreenHeading';
import DishForm from '../components/DishForm';
import { colors } from '../theme/colors';

export default function AddDishScreen({ navigation, menuItems, addMenuItem }) {
  const goHome = () => navigation.navigate('Home');

  const handleSubmit = (newDish) => {
    addMenuItem(newDish);

    // success popup, then back to Home where the new dish will show
    Alert.alert('Dish added', `"${newDish.dishName}" was added to the menu.`, [
      { text: 'OK', onPress: goHome },
    ]);
  };

  return (
    // keeps the form from getting hidden behind the keyboard
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        {/* "handled" lets buttons work while the keyboard is open,
            on drag hides the keyboard when I scroll */}
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <ScreenHeading title="ADD A DISH" />
          <DishForm
            submitLabel="SAVE DISH"
            onSubmit={handleSubmit}
            onCancel={goHome}
            otherDishNames={menuItems.map((dish) => dish.dishName)}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: 16 },
});