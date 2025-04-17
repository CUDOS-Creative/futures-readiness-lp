import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Helper to only animate if the element exists
const animateIfExists = (selector, yValue, triggerSelector) => {
	const el = document.querySelector(selector)
	if (el) {
		gsap.to(selector, {
			y: yValue,
			ease: 'none',
			scrollTrigger: {
				trigger: triggerSelector,
				start: '50% bottom',
				end: 'bottom top',
				scrub: true,
			},
		})
	}
}

// Apply animations conditionally
animateIfExists('.wheel', -300, '.section--grey')
