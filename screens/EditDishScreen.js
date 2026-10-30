// Noluthando Zondi ST10531705 MAST5112 POE Part 3s
// screens/EditDishScreen.js
// "EDIT DISH" - same DishForm as Add, but pre added with the dish
// I tapped. has UPDATE and DELETE (the delete will ask "are you sure" first)

import React from 'react';
import { StyleSheet, ScrollView, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeading from '../components/ScreenHeading';
import DishForm from '../components/DishForm';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';

export default function EditDishScreen({
  navigation,
  route,
  menuItems,
  updateMenuItem,
  deleteMenuItem,
}) {
  // Home sends me the dish's id when I tap a row
  const { dishId } = route.params;

  // looking the dish up in the live list (instead of passing the whole
  // dish through navigation) so I always get the latest version
  const dish = menuItems.find((item) => item.id === dishId);

  // here if the dish is gone there's nothing to show
  if (!dish) return null;

  const goHome = () => navigation.navigate('Home');

  // here are the  names of every OTHER dish, so saving a dish under its own
  // name doesn't show the "already on the menu" error
  const otherDishNames = menuItems
    .filter((item) => item.id !== dishId)
    .map((item) => item.dishName);

  const handleUpdate = (updatedDish) => {
    updateMenuItem(dishId, updatedDish);
    Alert.alert('Dish updated', `"${updatedDish.dishName}" was updated.`, [
      { text: 'OK', onPress: goHome },
    ]);
  };

  const handleDelete = () => {
    // destructive style makes the Delete option red on iOS
    Alert.alert('Delete dish?', `"${dish.dishName}" will be removed from the menu. This can't be undone.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          goHome(); // leave first so this screen isn't left staring at a dish that's gone
          deleteMenuItem(dishId);
          Alert.alert('Dish deleted', `"${dish.dishName}" was removed from the menu.`);
        },
      },
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
          <ScreenHeading title="EDIT DISH" />
          <DishForm
            key={dish.id}
            initialDish={dish}
            submitLabel="UPDATE DISH"
            onSubmit={handleUpdate}
            onCancel={goHome}
            otherDishNames={otherDishNames}
          >
            {/* this slots in under the UPDATE button */}
            <PrimaryButton title="DELETE DISH" variant="danger" onPress={handleDelete} />
          </DishForm>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: 16 },
});