import Burger from "../../assets/js/burger.js"
import {generatePaginationArray} from "../../assets/js/pagination.js"
import {pets} from "../../assets/js/pets.js"
import shuffle from "../../assets/js/utils/array-randomization.js"

/* TODO: Burger */
const domElements = {
	burger: document.querySelector('.burger'),
	header: document.querySelector('.header'),
	headerShadow: document.querySelector('.header__shadow'),
	logo: document.querySelector('#logo'),
	headerLink: document.querySelectorAll('.menu__link'),
	burgerHeader: document.querySelector('.burger-header'),
	pets: document.querySelector('.pets'),
}

const burger = new Burger(domElements)
burger.init()


/* TODO: Pagination */
const sliderContent = document.querySelector('.pets__wrapper')
const sliderArrows = document.querySelector('.slider__arrows')
const petsArray = generatePaginationArray(pets, shuffle) // 48 pets elements
const sliderConfig = {
	currentPage: 1, // 1 ... 6
	elementsPerPage: 8, // depends on screen width (8 || 6 || 3)
}

function mapPetsElements(arr) {
	return arr.map(({name, img}) => (`<div class="slider__card card">
            <img class="card__image" src=${img} alt=${name}>
            <div class="card__title">${name}</div>
            <button class="card__button button">Learn more</button>
          </div>`)).join('')
}

function getPetsElements({currentPage, elementsPerPage}, petsArray = []) {
	let end = currentPage * elementsPerPage
	let start = end - elementsPerPage
	const pets = petsArray.slice(start, end)

	return pets
}

function renderPets() {
	sliderContent.innerHTML = mapPetsElements(getPetsElements(sliderConfig, petsArray))
}

function createPaginationElement(classes = [], attribute, attributeProperty, innerElement, innerText) {
	const divElement = document.createElement('div')
	divElement.classList.add(...classes)
	divElement.dataset[attribute] = attributeProperty

	const title = document.createElement(innerElement)
	title.innerText = innerText
	divElement.insertAdjacentElement('afterbegin', title)

	divElement.addEventListener('click', () => handlePaginationClick(divElement))

	return divElement
}

function handlePaginationClick(divElement) {
	const arrows = document.querySelectorAll('.slider__arrow')
	let paginationPages = petsArray.length / sliderConfig.elementsPerPage // 6
	const dataAttribute = divElement.dataset.page // << || < || 1 ... 6 || > || >>
	const searchDataAttribute = ['<', '<<', '1', paginationPages.toString(), '>', '>>']

	function disableElements() {
		if (searchDataAttribute.slice(0, 3).includes(dataAttribute)) {
			arrows.forEach(el => {
				el.classList.remove('arrow--active', 'arrow--disabled')
				if (searchDataAttribute.slice(0, 2).includes(el.dataset.page)) {
					el.classList.add('arrow--disabled')
				}
				if (el.dataset.page === '1') {
					el.classList.add('arrow--active')
				}
			})
		}
		if (searchDataAttribute.slice(3).includes(dataAttribute)) {
			arrows.forEach(el => {
				el.classList.remove('arrow--active', 'arrow--disabled')
				if (searchDataAttribute.slice(4).includes(el.dataset.page)) {
					el.classList.add('arrow--disabled')
				}
				if (el.dataset.page === paginationPages.toString()) {
					el.classList.add('arrow--active')
				}
			})
		}
	}

	switch (true) {
		case dataAttribute >= 1 && dataAttribute <= paginationPages:
			arrows.forEach(el => {
				el.classList.remove('arrow--active', 'arrow--disabled')
			})
			divElement.classList.add('arrow--active')
			sliderConfig.currentPage = divElement.dataset.page
			if (Number(dataAttribute) === 1 || Number(dataAttribute) === paginationPages) {
				disableElements()
			}
			break
		case dataAttribute === '<':
			sliderConfig.currentPage--
			if(sliderConfig.currentPage === 1) {
				disableElements()
			} else {
				arrows.forEach(el => {
					el.classList.remove('arrow--disabled')
					if(Number(el.dataset.page) === sliderConfig.currentPage + 1) {
						el.classList.remove('arrow--active')
					}
					if(Number(el.dataset.page) === sliderConfig.currentPage) {
						el.classList.add('arrow--active')
					}
				})
			}
			break
		case dataAttribute === '<<':
			sliderConfig.currentPage = 1
			disableElements()
			break
		case dataAttribute === '>':
			sliderConfig.currentPage++
			if(sliderConfig.currentPage === paginationPages) {
				disableElements()
			} else {
				arrows.forEach(el => {
					el.classList.remove('arrow--disabled')
					if(Number(el.dataset.page) === sliderConfig.currentPage - 1) {
						el.classList.remove('arrow--active')
					}
					if(Number(el.dataset.page) === sliderConfig.currentPage) {
						el.classList.add('arrow--active')
					}
				})
			}
			break
		case dataAttribute === '>>':
			sliderConfig.currentPage = paginationPages
			disableElements()
			break
		default:
			console.log('switch nothing');
	}

	renderPets()
}

function renderPagination({currentPage, elementsPerPage}, petsArray) {
	let paginationPages = petsArray.length / elementsPerPage // 48 / 8 = 6

	const firstsLeftArrow = createPaginationElement(
		['slider__arrow', 'arrow', 'arrow--disabled'],
		'page',
		'<<',
		'h4',
		'<<'
	)
	const leftArrow = createPaginationElement(
		['slider__arrow', 'arrow', 'arrow--disabled'],
		'page',
		'<',
		'h4',
		'<'
	)
	const rightArrow = createPaginationElement(
		['slider__arrow', 'arrow'],
		'page',
		'>',
		'h4',
		'>'
	)
	const lastRightArrow = createPaginationElement(
		['slider__arrow', 'arrow'],
		'page',
		'>>',
		'h4',
		'>>'
	)

	sliderArrows.insertAdjacentElement('beforeend', firstsLeftArrow)
	sliderArrows.insertAdjacentElement('beforeend', leftArrow)

	for (let i = 1; i <= paginationPages; i++) {
		const classes = i === 1
			? ['slider__arrow', 'arrow', 'arrow--active']
			: ['slider__arrow', 'arrow']

		sliderArrows.insertAdjacentElement('beforeend', createPaginationElement(
			classes,
			'page',
			i,
			'h4',
			i
		))
	}

	sliderArrows.insertAdjacentElement('beforeend', rightArrow)
	sliderArrows.insertAdjacentElement('beforeend', lastRightArrow)
}

// renderPets()
// renderPagination(sliderConfig, petsArray)