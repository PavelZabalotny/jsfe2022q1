export default class {
	constructor({burger, logo, header, headerShadow, headerLink, burgerHeader, pets}) {
		this.burger = burger
		this.logo = logo
		this.header = header
		this.headerShadow = headerShadow
		this.headerLink = headerLink
		this.burgerHeader = burgerHeader
		this.pets = pets
	}

	burgerClick() {
		if(window.innerWidth < 768) {
			this.logo.classList.toggle('hidden')
			this.header.classList.toggle('right-0')
			this.headerShadow.classList.toggle('visible')
			this.headerShadow.classList.toggle('right-0')
			this.burger.classList.toggle('burger--active')
			this.burger.classList.toggle('position-fixed')
			this.burgerHeader?.classList.toggle('hidden')
			this.pets?.classList.toggle('pt-160')
		}
	}

	init() {
		this.burger.addEventListener('click', () => this.burgerClick())
		this.headerLink.forEach(el => {
			el.addEventListener('click', () => this.burgerClick())
		})
		this.headerShadow.addEventListener('click', () => this.burgerClick())
	}
}