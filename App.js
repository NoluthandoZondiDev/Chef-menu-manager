// Noluthando Zondi ST10531705 MAST5112 POE PART 2
// App.js - entry point, sets up navigation + holds the menu list

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddDishScreen from './screens/AddDishScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // keeping the dish list up here (not inside HomeScreen) brcause
  // both screens need it - Home reads it to show the list, AddDish
  // writes to it when a new dish gets saved
  const [menuItems, setMenuItems] = useState([]);

  const addMenuItem = (newItem) => {
    // giving each dish an id based on the timestamp so FlatList has
    // something unique to key off
    const itemWithId = { ...newItem, id: Date.now().toString() };

    // using (prevItems) => [...] instead of menuItems => [...] here,
    // just safer if things update quickly I think
    setMenuItems((prevItems) => [...prevItems, itemWithId]);
  };

  return (
    <NavigationContainer>
      {/* hiding the default nav header since each screen already has
          its own custom heading matching the Part 1 design */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* passing menuItems in as an exxtra prop alongside the normal
            navigation props */}
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>

        <Stack.Screen name="AddDish">
          {(props) => <AddDishScreen {...props} addMenuItem={addMenuItem} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}