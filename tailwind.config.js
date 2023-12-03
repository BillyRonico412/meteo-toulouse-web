/** @type {import('tailwindcss').Config} */
// biome-ignore lint/nursery/noDefaultExport: <explanation>
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"morning-1": "#F1B14B",
				"morning-2": "#BC2C35",
				"day-1": "#4BB5F1",
				"day-2": "#2F2CBC",
				"night-1": "#223076",
				"night-2": "#06050E",
			},
		},
	},
	plugins: [],
}
