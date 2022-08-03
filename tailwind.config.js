/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'dark-gray': {
					100: 'hsl(0, 0%, 59%)',
					900: 'hsl(0, 0%, 17%)',
				},
			},
			fontFamily: {
				rubik: ['Rubik', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
