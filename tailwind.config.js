const rem0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}rem`) };

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      minHeight: rem0_10,
    },
  },
  darkMode: 'media', //default os system
  plugins: [require('@tailwindcss/forms')],
};
