// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// components/SuggestedDishesModal.js
// a popup list of ready-made dishes. it hides any dish that's already
// on the menu, and it only reports which one I tapped (Add screen fills the form)

import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeading from './ScreenHeading';
import DishRow from './DishRow';
import { SAMPLE_DISHES } from '../constants/sampleDishes';
import { colors, fonts } from '../theme/colors';

export default function SuggestedDishesModal({ visible, existingDishNames, onSelect, onClose }) {
  // lowercase compare so it matches the duplicate rule in validateDish
  const takenNames = existingDishNames.map((name) => name.trim().toLowerCase());
  const availableDishes = SAMPLE_DISHES.filter(
    (dish) => !takenNames.includes(dish.dishName.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <ScreenHeading title="SUGGESTED DISHES" />

        {availableDishes.length === 0 ? (
          <Text style={styles.emptyText}>
            Every suggested dish is already on your menu.
          </Text>
        ) : (
          <FlatList
            data={availableDishes}
            keyExtractor={(item) => item.dishName}
            renderItem={({ item }) => (
              <DishRow dish={item} actionLabel="Use" onPress={() => onSelect(item)} />
            )}
          />
        )}

        <TouchableOpacity onPress={onClose} accessibilityLabel="Close suggested dishes">
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  emptyText: { fontFamily: fonts.body, fontSize: 16, color: colors.secondaryText, textAlign: 'center', marginTop: 40 },
  closeText: { fontFamily: fonts.body, textAlign: 'center', marginVertical: 16, color: colors.secondaryText, fontSize: 13 },
});