// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// screens/HomeScreen.js
// "TODAY'S MENU" - the hub screen. it doesn't own the dishes, App.js
// hands them over. it DOES own what I typed in search + which course
// chip is picked, because only this screen cares about those

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeading from '../components/ScreenHeading';
import DishRow from '../components/DishRow';
import SearchBar from '../components/SearchBar';
import FilterRow from '../components/FilterRow';
import { filterDishes } from '../utils/filterDishes';
import { colors, fonts } from '../theme/colors';

export default function HomeScreen({ navigation, menuItems }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  // only the dishes that pass the search + course filter
  const visibleDishes = filterDishes(menuItems, searchText, selectedCourse);

  // true if a search or a course filter is switched on right now
  const isFiltering = searchText.trim() !== '' || selectedCourse !== 'All';

  // puts everything back to normal so the whole menu shows again
  const clearFilters = () => {
    setSearchText('');
    setSelectedCourse('All');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeading title="TODAY'S MENU" />

      {/* nothing to search yet if the menu is empty, so hide these */}
      {menuItems.length > 0 && (
        <>
          <SearchBar value={searchText} onChangeText={setSearchText} />
          <FilterRow selectedCourse={selectedCourse} onSelect={setSelectedCourse} />
        </>
      )}

      {menuItems.length === 0 ? (
        // 1) the menu is empty
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            No dishes yet — tap + to add your first creation
          </Text>
        </View>
      ) : visibleDishes.length === 0 ? (
        // 2) dishes exist, but none match the search/filter
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>No dishes match your search.</Text>
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clearLink}>Clear search and filter</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 3) show the matching dishes
        <FlatList
          data={visibleDishes}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled" // so tapping a row works while the keyboard is open
          renderItem={({ item }) => (
            <DishRow
              dish={item}
              onPress={() => navigation.navigate('EditDish', { dishId: item.id })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 110 }}
        />
      )}

      {/* count: normal when nothing is filtered, "Showing X of Y" when it is */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {isFiltering
            ? `Showing ${visibleDishes.length} of ${menuItems.length} dishes`
            : `${menuItems.length} ${menuItems.length === 1 ? 'dish' : 'dishes'} on the menu`}
        </Text>
      </View>

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

  messageBox: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  messageText: { fontFamily: fonts.body, fontSize: 16, color: colors.secondaryText, textAlign: 'center' },
  clearLink: { fontFamily: fonts.body, fontSize: 14, color: colors.text, marginTop: 12, textDecorationLine: 'underline' },

  footer: { borderTopWidth: 1, borderTopColor: colors.divider, paddingTop: 10, marginTop: 4, marginBottom: 16 },
  footerText: { fontFamily: fonts.body, fontSize: 13, color: colors.secondaryText },

  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addButtonText: { fontSize: 28, color: '#FFFFFF', marginTop: -2 },
});