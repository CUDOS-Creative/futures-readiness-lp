import Swiper from 'swiper'
import {
	Autoplay,
	Pagination,
	Keyboard,
	EffectFade,
	Navigation,
} from 'swiper/modules'

const swiperContainers = document.querySelectorAll('.gallery')

// Loop through each container and initialize Swiper
swiperContainers.forEach((container) => {
	const paginationEl = container.nextElementSibling
	const slidesCount = parseInt(container.getAttribute('data-slides'), 10)

	if (paginationEl && paginationEl.classList.contains('swiper-pagination')) {
		const swiperInstance = {
			modules: [Pagination, Keyboard, Autoplay],
			slidesPerView: 1.3,
			spaceBetween: 5,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			centeredSlides: true,
			loop: true, // Infinite loop, with cloned slides
			loopAdditionalSlides: 1, // Number of slides to clone
			// autoplay: {
			// 	delay: 1500, // Time between slides (in milliseconds)
			// 	disableOnInteraction: false, // Keeps autoplay running after user interaction
			// },
			speed: 800,
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 1.8,
					spaceBetween: 10,
				},
				1199: {
					slidesPerView: 2.2,
					spaceBetween: 20,
				},
				1440: {
					slidesPerView: 2.8,
				},
			},
		}

		if (slidesCount < 5) {
			swiperInstance.loopAdditionalSlides = 0
		}

		if (slidesCount < 4) {
			swiperInstance.loop = false
			swiperInstance.initialSlide = 1
		}

		new Swiper(container, swiperInstance)

		// Add tabindex and aria-label for each pagination bullet
		paginationEl
			.querySelectorAll('.swiper-pagination-bullet')
			.forEach((bullet, index) => {
				bullet.setAttribute('tabindex', '0')
				bullet.setAttribute('aria-label', `Go to slide ${index + 1}`)

				// Add a keydown event listener for the Enter key
				bullet.addEventListener('keydown', (event) => {
					if (event.key === 'Enter') {
						swiperInstance.slideTo(index)
					}
				})
			})
	}
})

// Hero Swiper

document.addEventListener('DOMContentLoaded', function () {
	const imagesEl = document.querySelector('.js-swiper-images')
	const contentEl = document.querySelector('.js-swiper-content')

	if (!imagesEl || !contentEl) return

	const swiperImages = new Swiper(imagesEl, {
		modules: [EffectFade],
		slidesPerView: 1,
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		pagination: {
			el: '.js-swiper-content-pagination',
			clickable: true,
		},
	})

	const swiperContent = new Swiper(contentEl, {
		modules: [EffectFade, Pagination],
		slidesPerView: 1,
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		pagination: {
			el: '.js-swiper-content-pagination',
			clickable: true,
		},
	})

	swiperImages.on('slideChange', function () {
		swiperContent.slideTo(swiperImages.activeIndex)
	})

	swiperContent.on('slideChange', function () {
		swiperImages.slideTo(swiperContent.activeIndex)
	})
})

// Highlights Swiper

document.addEventListener('DOMContentLoaded', function () {
	const highlightsElement = document.querySelector('.highlights')

	if (highlightsElement) {
		const swiper = new Swiper('.highlights', {
			modules: [EffectFade],
			slidesPerView: 1,
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			loop: false, // Adjust as needed
			touchMove: false, // Disable swiping
			allowTouchMove: false, // Prevent touch move
		})

		const buttons = document.querySelectorAll('.highlight-button')

		buttons.forEach((button, index) => {
			button.setAttribute('role', 'button')
			button.setAttribute('aria-pressed', 'false')

			button.addEventListener('click', function () {
				// Remove active class and aria-pressed from all buttons
				buttons.forEach((btn) => {
					btn.classList.remove('active')
					btn.setAttribute('aria-pressed', 'false')
				})

				// Add active class and aria-pressed to the clicked button
				this.classList.add('active')
				this.setAttribute('aria-pressed', 'true')

				// Slide to the selected index
				swiper.slideTo(index)
			})

			button.addEventListener('keydown', function (event) {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault()
					this.click() // Simulate button click
				}
			})
		})
	}
})

// Cards Swiper

document.addEventListener('DOMContentLoaded', function () {
	const cardSliders = document.querySelectorAll('.js-cards')

	cardSliders.forEach((slider) => {
		const slidesCount = parseInt(slider.getAttribute('data-slides'), 10)
		const next = slider.parentElement.querySelector('.js-cards-nav__next')
		const prev = slider.parentElement.querySelector('.js-cards-nav__prev')

		const swiperConfig = {
			modules: [Navigation, Keyboard],
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 15,
			// centeredSlides: true,
			loop: true,
			navigation: {
				nextEl: next || undefined, // Prevent errors if the button is missing
				prevEl: prev || undefined,
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
					spaceBetween: 30,
					centeredSlides: false,
					loop: false,
				},
				1280: {
					slidesPerView: 3,
					spaceBetween: 30,
					centeredSlides: false,
					loop: false,
				},
			},
		}

		if (slidesCount >= 6) {
			swiperConfig.breakpoints = {
				640: {
					slidesPerView: 2,
					spaceBetween: 30,
					centeredSlides: true,
					loop: true,
				},
				1280: {
					slidesPerView: 3,
					spaceBetween: 30,
					loopAdditionalSlides: 1,
					centeredSlides: true,
					loop: true,
				},
			}
		}

		// Initialize Swiper with the configured options
		new Swiper(slider, swiperConfig)
	})
})
