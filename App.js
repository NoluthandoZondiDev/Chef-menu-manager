// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// App.js - its the entry place, sets up navigation + holds the menu list
// (and now saves it to the phone so it survives closing the app)

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import AddDishScreen from './screens/AddDishScreen';
import EditDishScreen from './screens/EditDishScreen';

const Stack = createNativeStackNavigator();

// the "label" my saved menu sits under on the phone
const STORAGE_KEY = 'chefMenuItems';

export default function App() {
  // keeping the dish list up here (not inside a screen) because
  // Home, Add and Edit they all need it
  const [menuItems, setMenuItems] = useState([]);

  // false until I've finished reading the saved menu off the phone.
  // without this, the app would save an empty [] over my real menu
  // before it had a chance to load. that would be a disaster
  const [isLoaded, setIsLoaded] = useState(false);

  // runs once when the app opens: load the saved menu
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const savedMenu = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedMenu) setMenuItems(JSON.parse(savedMenu));
      } catch (error) {
        console.log('Could not load the menu:', error);
      } finally {
        setIsLoaded(true); // finished (even if nothing was saved yet)
      }
    };
    loadMenu();
  }, []);

  // runs every time the menu changes: save it
  useEffect(() => {
    if (!isLoaded) return; // don't save before loading has finished
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems)).catch((error) =>
      console.log('Could not save the menu:', error)
    );
  }, [menuItems, isLoaded]);

  const addMenuItem = (newItem) => {
    // giving each dish an id based on the timestamp so FlatList has
    // something unique to key off
    const itemWithId = { ...newItem, id: Date.now().toString() };

    // (prevItems) => [...] is safer if updates happen quickly
    setMenuItems((prevItems) => [...prevItems, itemWithId]);
  };

  // find the dish with this id and swap in the new info (keeps its id)
  const updateMenuItem = (id, updatedInfo) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...updatedInfo } : item))
    );
  };

  // keep every dish EXCEPT the one with this id
  const deleteMenuItem = (id) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // wait for the saved menu before showing anything, so Home never
  // flashes "No dishes yet" for a split second
  if (!isLoaded) return null;

  return (
    <NavigationContainer>
      {/* hiding the default nav header since each screen already has
          its own custom heading matching the Part 1 design */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* passing the data + functions in as extra props alongside
            the normal navigation props */}
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>

        <Stack.Screen name="AddDish">
          {(props) => (
            <AddDishScreen {...props} menuItems={menuItems} addMenuItem={addMenuItem} />
          )}
        </Stack.Screen>

        <Stack.Screen name="EditDish">
          {(props) => (
            <EditDishScreen
              {...props}
              menuItems={menuItems}
              updateMenuItem={updateMenuItem}
              deleteMenuItem={deleteMenuItem}
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}