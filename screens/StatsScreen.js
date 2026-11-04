// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// screens/StatsScreen.js
// "MENU STATISTICS" - total dishes, average price and dishes per course.
// it only reads the menu from App.js, it never changes it

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeading from '../components/ScreenHeading';
import StatRow from '../components/StatRow';
import { getMenuStats } from '../utils/menuStats';
import { formatPrice } from '../utils/formatPrice';
import { colors, fonts } from '../theme/colors';

export default function StatsScreen({ navigation, menuItems }) {
  const { totalDishes, averagePrice, courseCounts } = getMenuStats(menuItems);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeading title="MENU STATISTICS" />

        {/* nothing to count yet, so say so instead of showing zeros */}
        {totalDishes === 0 ? (
          <Text style={styles.emptyText}>
            No dishes on the menu yet, so there are no statistics to show. Add a dish first.
          </Text>
        ) : (
          <>
            <StatRow label="Total dishes" value={String(totalDishes)} />
            <StatRow label="Average price" value={formatPrice(averagePrice)} />

            <Text style={styles.sectionTitle}>DISHES PER COURSE</Text>
            {courseCounts.map(({ course, count }) => (
              <StatRow key={course} label={course} value={String(count)} />
            ))}
          </>
        )}

        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Back to the menu">
          <Text style={styles.backText}>Back to menu</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: 16 },
  emptyText: { fontFamily: fonts.body, fontSize: 16, color: colors.secondaryText, textAlign: 'center', marginTop: 40 },
  sectionTitle: {
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: 1.2,
    color: colors.secondaryText,
    marginTop: 28,
  },
  backText: { fontFamily: fonts.body, textAlign: 'center', marginTop: 28, color: colors.secondaryText, fontSize: 13 },
});