// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// utils/menuHelpers.js
// the "thinking" functions for the menu - they take the list in and
// give a result back, no screens involved (makes them easy to test) when I'm testing

import { COURSES } from '../constants/courses';

// here you can search by dish name AND/OR filter by course
// the searchText: whatever is in the search bar ('' = no search)
// course: 'All' or one of the COURSES
export const filterDishes = (menuItems, searchText, course) => {
  const search = searchText.trim().toLowerCase(); // lowercase so "BOB" finds "Bobotie"

  return menuItems.filter((dish) => {
    const matchesSearch = dish.dishName.toLowerCase().includes(search);
    const matchesCourse = course === 'All' || dish.course === course;
    return matchesSearch && matchesCourse; // must pass BOTH to show
  });
};

// this is the total, average price and how many dishes per course
export const calculateStatistics = (menuItems) => {
  const total = menuItems.length;

  // this will be adding up every price, starting from 0
  const priceSum = menuItems.reduce((sum, dish) => sum + dish.price, 0);

  // so if the menu is empty, 0 / 0 would give NaN, so I return 0 instead
  const averagePrice = total === 0 ? 0 : priceSum / total;

  // the build { Starter: 0, 'Main Course': 0, Dessert: 0 } from COURSES,
  // then count each dish into its course
  const countByCourse = {};
  COURSES.forEach((course) => {
    countByCourse[course] = menuItems.filter((dish) => dish.course === course).length;
  });

  return { total, averagePrice, countByCourse };
};