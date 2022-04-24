import {generatePaginationArray} from "./pagination.js"
import {pets} from "./pets.js"
import shuffle from "./utils/array-randomization.js"
import Popup from "./popup.js"

export default class {
	constructor(sliderLink) {
		this.sliderLink = sliderLink // .pets__slider
		this.start = 0
		this.quantity = null
		this.windowWidth = window.innerWidth
		this.petsMap = []
		this.petsLink = document.querySelector('.slider__content')
		this.petsString = null
	}

	getPetsArray(pets) {
		return generatePaginationArray(pets, shuffle, 3)
	}

	getPetsMap(pets) {
		this.petsMap = this.getPetsArray(pets).map(({name, img}) => `<div class="slider__card card" data-name="${name}">
	<img class="card__image" src="${img}" alt="${name}">
	<div class="card__title">${name}</div>
	<button class="card__button button">Learn more</button>
</div>`)
	}

	setSliderQuantity() {
		switch (true) {
			case this.windowWidth >= 1280:
				this.quantity = 3
				break
			case this.windowWidth < 768:
				this.quantity = 1
				break
			default:
				this.quantity = 2
		}
	}

	generateElement(name, classes) {
		let element = document.createElement(name)
		element.classList.add(...classes)
		return element
	}

	handleArrowClick() {
		const allPets = document.querySelectorAll('.slider__card')
		const petsShown = []
		allPets.forEach(el => {
			petsShown.push(el.dataset.name)
		})
		const newPets = pets.filter(({name}) => petsShown.every(el => el !== name))
		this.getPetsMap(newPets)
		this.generateSliderPets()

		// render with fadeOut effect
		setTimeout(() => {
			this.renderPets()
			// set popup
			this.setPetsPopup()
		}, 200)

		document.querySelectorAll('.slider__card').forEach(el => {
			el.classList.add('opacity-0')
		})
	}

	generateSliderArrows() {
		// left arrow
		let arrowLeft = this.generateElement('div', ['slider__arrow', 'arrow_bg', 'arrow__pos-left'])
		arrowLeft.addEventListener('click', () => this.handleArrowClick())
		this.sliderLink.insertAdjacentElement('afterbegin', arrowLeft)
		// slider
		let slider = this.generateElement('div', ['slider__content'])
		this.sliderLink.insertAdjacentElement('beforeend', slider)
		// right arrow
		let arrowRight = this.generateElement('div', ['slider__arrow', 'arrow_bg', 'arrow__pos-right', 'rotate-y-180'])
		arrowRight.addEventListener('click', () => this.handleArrowClick())
		this.sliderLink.insertAdjacentElement('beforeend', arrowRight)
	}

	generateSliderPets() {
		this.petsString = this.petsMap.slice(this.start, this.quantity).join('')
	}

	setPetsPopup() {
		/* TODO: Popup */
		const sliderCard = document.querySelectorAll('.slider__card')
		const popup = new Popup(sliderCard, pets)
		popup.init()
	}

	renderPets() {
		this.petsLink.innerHTML = this.petsString
	}

	init() {
		this.setSliderQuantity() // 3 || 2 || 1
		this.generateSliderArrows() // left arrow and right arrow
		this.getPetsMap(pets)
		this.generateSliderPets()
		this.renderPets()
		this.setPetsPopup()
	}
}