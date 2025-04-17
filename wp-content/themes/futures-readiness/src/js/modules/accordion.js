import Accordion from 'accordion-js'

const accordions = Array.from(document.querySelectorAll('.accordion-container'))

// Get the indexes of accordions that should open
const openOnInit = accordions
	.map((accordion, index) => (accordion.dataset.closed === '1' ? null : index))
	.filter((index) => index !== null) // Remove null values

new Accordion(accordions, {
	duration: 300,
	showMultiple: false, // Allow multiple accordions to open
	openOnInit, // Open all accordions except those with data-closed="1"
})
