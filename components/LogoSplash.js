// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// components/LogoSplash.js
// the logo screen that shows for a couple of seconds when the app opens.
// it only lives here, no other screen uses the logo

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// same colour as the picture's background so there are no visible edges
const SPLASH_BACKGROUND = '#E6DDF7';

export default function LogoSplash() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/plated-splash.png')}
        style={styles.image}
        resizeMode="contain"
        accessibilityLabel="Plated logo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SPLASH_BACKGROUND },
  image: { width: '100%', height: '100%' },
});