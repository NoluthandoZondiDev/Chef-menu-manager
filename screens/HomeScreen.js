// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// screens/HomeScreen.js
// "TODAY'S MENU" - the hub screen, shows every dish added so far.
// so it doesn't own the data, just displays whatever App.js hands it

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeading from '../components/ScreenHeading';
import DishRow from '../components/DishRow';
import { colors, fonts } from '../theme/colors';

export default function HomeScreen({ navigation, menuItems }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeading title="TODAY'S MENU" />

      {/* show empty state if there's nothing on the menu yet */}
      {menuItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No dishes yet — tap + to add your first creation
          </Text>
        </View>
      ) : (
        // FlatList only shows what's on screen so it stays fast as the menu grows
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DishRow
              dish={item}
              onPress={() => navigation.navigate('EditDish', { dishId: item.id })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 110 }} // so last row isn't hidden behind the + button
        />
      )}

      {/* the dish counter - updates automatically whenever menuItems changes */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {menuItems.length} {menuItems.length === 1 ? 'dish' : 'dishes'} on the menu
        </Text>
      </View>

      {/* just navigates to AddDish, doesn't add anything itself */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddDish')}
        accessibilityLabel="Add a new dish"
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },

  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyText: { fontFamily: fonts.body, fontSize: 16, color: colors.secondaryText, textAlign: 'center' },

  footer: { borderTopWidth: 1, borderTopColor: colors.divider, paddingTop: 10, marginTop: 4, marginBottom: 16 },
  footerText: { fontFamily: fonts.body, fontSize: 13, color: colors.secondaryText },

  // pinned to the bottom right corner, stays put no matter how long the list gets
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28, // half of width/height = circle
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // little shadow so it looks raised
  },
  addButtonText: { fontSize: 28, color: '#FFFFFF', marginTop: -2 },
});