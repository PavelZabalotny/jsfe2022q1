import Burger from "../../assets/js/burger.js"

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