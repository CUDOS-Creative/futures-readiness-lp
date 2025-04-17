module.exports = {
	content: [
		'../views/**/*.twig', // Ensure this path is correct
	],
	theme: {
		colors: {
			currentColor: '#172d41',
			focus: '#00eeff', // Custom focus color (blue-600)
		},
		ringColor: {
			DEFAULT: '#00eeff', // Default focus ring color
		},
		outlineColor: {
			DEFAULT: '#00eeff', // Default outline color
		},
		container: {
			center: true, // Centers the container
			padding: '1rem', // Adds padding inside the container
			// screens: {
			// 	// xxl: '1328px',
			// },
		},
	},
}
