// Noluthando Zondi ST10531705 MAST5112 POE PART2
// theme/colors.js
// my Part 1 palette (lavender + champagne) all in one place
// so I'm not hardcoding hex codes in every single screen

export const colors = {
  primary: '#B4A7C9',       // lavender - headers, buttons, the + button I want it to be luxurious
  background: '#FBF7EF',    // warm off-white background
  accent: '#D9C08C',        // champagne gold - dividers, price, outlines for it to be fancy
  text: '#3A2E4A',          // deep plum - main text
  secondaryText: '#A398AC', // muted lavender-grey - labels/descriptions
  priceText: '#4A3B14',     // dark amber-brown so price is readable on champagne
  error: '#B3455B',         // dusty rose for error messages
  divider: '#E4DCCB',       // hairline divider colour
};

// using generic 'serif' / 'sans-serif' for now so I don't have to
// deal with loading custom fonts yet - swap these later for the
// actual Playfair/Poppins fonts if I have time
export const fonts = {
  heading: 'serif',
  body: 'sans-serif',
};