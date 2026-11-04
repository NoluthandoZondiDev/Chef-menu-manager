// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// utils/menuStats.js
// does all the maths for the Statistics screen in one place, so the
// screen only has to show the numbers (and I can reuse this anywhere)

import { COURSES } from '../constants/courses';

export const getMenuStats = (dishes) => {
  const totalDishes = dishes.length;

  // add up every price (Number() just in case one was saved as text)
  const totalPrice = dishes.reduce((sum, dish) => sum + Number(dish.price), 0);

  // careful: dividing by 0 gives NaN, so an empty menu gets an average of 0
  const averagePrice = totalDishes === 0 ? 0 : totalPrice / totalDishes;

  // one entry per course, built from COURSES so the names always match
  const courseCounts = COURSES.map((courseName) => ({
    course: courseName,
    count: dishes.filter((dish) => dish.course === courseName).length,
  }));

  return { totalDishes, averagePrice, courseCounts };
};