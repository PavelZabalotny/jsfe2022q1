import Burger from "../../assets/js/burger.js"
import Carousel from "../../assets/js/carousel.js"

/* TODO: Burger */
const domElements = {
	burger: document.querySelector('.burger'),
	header: document.querySelector('.header'),
	headerShadow: document.querySelector('.header__shadow'),
	headerLink: document.querySelectorAll('.menu__link'),
}

const burger = new Burger(domElements)
burger.init()

/* TODO: Carousel */
const sliderLink = document.querySelector('.pets__slider')
const carousel = new Carousel(sliderLink)
carousel.init()
