// Noluthando Zondi ST10531705 MAST5112 POE PART2
// screens/HomeScreen.js
// "TODAY'S MENU" - the hub screen, shows every dish added so far
// doesn't own the data, just displays whatever App.js hands it

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, fonts } from '../theme/colors';

export default function HomeScreen({ navigation, menuItems }) {
  // turns 95 into "R 95.00" - matches the price formatting rule from Part 1
  const formatPrice = (price) => `R ${Number(price).toFixed(2)}`;

  // how each row in the list should look
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {/* small course tag - extra touch so chef can scan by course
            even before filtering exists */}
        <Text style={styles.courseTag}>{item.course}</Text>
      </View>
      <Text style={styles.price}>{formatPrice(item.price)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingWrap}>
        <Text style={styles.heading}>TODAY'S MENU</Text>
        <View style={styles.underline} />
      </View>

      {/* show empty state if there's nothing on the menu yet */}
      {menuItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No dishes yet — tap + to add your first creation
          </Text>
        </View>
      ) : (
        // FlatList - the component I picked in Part 1, only shows
        // what's on screen so it stays fast as the menu grows
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 110 }} // so last row isn't hidden behind the + button
        />
      )}

      {/* dish counter - updates automatically whenever menuItems changes */}
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

  headingWrap: { marginTop: 20, marginBottom: 16 },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 26,
    letterSpacing: 2, // that uppercase luxury look from Part 1 so im maintaining the same style
    color: colors.text,
    textTransform: 'uppercase',
  },
  underline: { marginTop: 8, height: 2, width: 60, backgroundColor: colors.accent },

  // hairline divider under each row instead of boxed cards
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowText: { flex: 1, paddingRight: 12 },
  dishName: { fontFamily: fonts.heading, fontSize: 19, color: colors.text },
  description: { fontFamily: fonts.body, fontSize: 15, color: colors.secondaryText, marginTop: 4 },
  courseTag: {
    fontFamily: fonts.body,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.accent,
    textTransform: 'uppercase',
    marginTop: 6,
  },
  price: { fontFamily: fonts.heading, fontSize: 16, color: colors.priceText },

  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyText: { fontFamily: fonts.body, fontSize: 16, color: colors.secondaryText, textAlign: 'center' },

  footer: { borderTopWidth: 1, borderTopColor: colors.divider, paddingTop: 10, marginTop: 4, marginBottom: 16 },
  footerText: { fontFamily: fonts.body, fontSize: 13, color: colors.secondaryText },

  // pinned to the bottom-right corner, stays put no matter how long the list gets
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