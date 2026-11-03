// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// utils/filterDishes.js
// takes the full menu and gives back only the dishes that match what
// I typed in the search bar AND the course chip I picked.
// one function so Home doesn't get messy

export const filterDishes = (dishes, searchText, selectedCourse) => {
  // lowercase + trimmed so "BOBO " still finds "Bobotie"
  const searchQuery = searchText.trim().toLowerCase();

  return dishes.filter((dish) => {
    const matchesCourse = selectedCourse === 'All' || dish.course === selectedCourse;
    const matchesName = dish.dishName.toLowerCase().includes(searchQuery);
    return matchesCourse && matchesName; // has to pass both tests
  });
};