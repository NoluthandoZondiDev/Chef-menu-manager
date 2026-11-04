// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// constants/sampleDishes.js
// ready-made dishes the chef can pick from instead of typing everything.
// they follow the same rules as validateDish (name under 40, description under 120)
// and the course names match constants/courses.js

export const SAMPLE_DISHES = [
  // starters
  { dishName: 'Samoosas', description: 'Crispy pastry parcels filled with spiced mince and vegetables.', course: 'Starter', price: 55 },
  { dishName: 'Mussel Soup with Steamed Bread', description: 'Creamy mussel broth served with soft steamed bread.', course: 'Starter', price: 85 },
  { dishName: 'Chicken Livers Peri-Peri', description: 'Pan-fried chicken livers in a spicy peri-peri sauce.', course: 'Starter', price: 70 },
  { dishName: 'Biltong and Droewors Board', description: 'A sharing board of sliced biltong and crunchy droewors.', course: 'Starter', price: 95 },
  { dishName: 'Biltong Fig Salad', description: 'Fresh greens with sweet figs, shaved biltong and a light dressing.', course: 'Starter', price: 80 },

  // main courses
  { dishName: 'Kota', description: 'Hollowed quarter loaf stuffed with chips, polony, egg and sauce.', course: 'Main Course', price: 65 },
  { dishName: 'Mogodu', description: 'Slow-cooked tripe in a rich gravy, served with pap.', course: 'Main Course', price: 95 },
  { dishName: 'Bunny Chow', description: 'Hollowed-out bread loaf filled with a spicy curry.', course: 'Main Course', price: 90 },
  { dishName: 'Pap and Boerewors', description: 'Grilled boerewors served with soft pap and tomato relish.', course: 'Main Course', price: 85 },
  { dishName: 'Potjiekos', description: 'Slow-cooked layered stew of meat and vegetables from the cast-iron pot.', course: 'Main Course', price: 135 },
  { dishName: 'Mashed Potatoes with Oxtail', description: 'Fall-off-the-bone braised oxtail on creamy mashed potatoes.', course: 'Main Course', price: 150 },

  // desserts
  { dishName: 'Malva Pudding', description: 'Warm apricot sponge pudding with custard.', course: 'Dessert', price: 65 },
  { dishName: 'Melktert', description: 'Classic milk tart with a dusting of cinnamon.', course: 'Dessert', price: 55 },
  { dishName: 'Koeksisters', description: 'Plaited, deep-fried dough soaked in cold sweet syrup.', course: 'Dessert', price: 45 },
  { dishName: 'Peppermint Crisp Tart', description: 'Layers of caramel, cream and biscuits topped with grated peppermint chocolate.', course: 'Dessert', price: 60 },
];