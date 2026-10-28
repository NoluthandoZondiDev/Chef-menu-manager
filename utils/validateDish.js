// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// utils/validateDish.js
// one validation function for BOTH Add and Edit, so the rules can't
// be apart. it returns an errors object - empty object = all good

// in South Africa we often type 95,50 with a comma, so I swap it for a dot
// before turning the text into a number
export const parsePrice = (priceText) =>
  Number(String(priceText).trim().replace(',', '.'));

export const validateDish = ({ dishName, description, price }) => {
  const errors = {};

  // the dish name: required, and kept a reasonable length
  if (!dishName.trim()) {
    errors.dishName = 'Please enter a dish name.';
  } else if (dishName.trim().length < 2) {
    errors.dishName = 'Dish name must be at least 2 characters.';
  } else if (dishName.trim().length > 40) {
    errors.dishName = 'Dish name must be 40 characters or less.';
  }

  // the description: required, short enough to fit nicely on the list
  if (!description.trim()) {
    errors.description = 'Please enter a description.';
  } else if (description.trim().length > 120) {
    errors.description = 'Description must be 120 characters or less.';
  }

  // the price: Number() is stricter than parseFloat - "12abc" fails here
  // (parseFloat would let it through as 12)
  if (!String(price).trim()) {
    errors.price = 'Please enter a price.';
  } else {
    const priceNumber = parsePrice(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      errors.price = 'Price must be a number greater than 0.';
    } else if (priceNumber > 9999.99) {
      errors.price = 'Price must be R 9999.99 or less.';
    }
  }

  return errors;
};