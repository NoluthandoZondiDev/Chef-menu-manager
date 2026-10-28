// Noluthando Zondi ST10531705 MAST5112 POE Part3
// constants/courses.js
// the course names live here ONCE so Add, Edit, the filter row and the
// stats screen all use the same spelling (no more typo bugs)

// so here these are the values that actually get saved on each dish
export const COURSES = ['Starter', 'Main Course', 'Dessert'];

// this is what the filter row shows - label is the nice short text,
// value is what we compare against dish.course ('All' = no filter)
export const FILTER_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Starters', value: 'Starter' },
  { label: 'Mains', value: 'Main Course' },
  { label: 'Desserts', value: 'Dessert' },
];