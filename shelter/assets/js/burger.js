export default class {
	constructor({burger, header, headerShadow, headerLink, burgerHeader, pets}) {
		this.burger = burger
		this.header = header
		this.headerShadow = headerShadow
		this.headerLink = headerLink
		this.burgerHeader = burgerHeader
		this.pets = pets
	}

	burgerClick() {
		if(window.innerWidth < 768) {
			this.header.classList.toggle('right-0')
			this.headerShadow.classList.toggle('visible')
			this.headerShadow.classList.toggle('right-0')
			this.burger.classList.toggle('burger--active')
			this.burger.classList.toggle('position-fixed')
			this.burgerHeader?.classList.toggle('hidden')
			this.pets?.classList.toggle('pt-160')
			document.body.classList.toggle('overflowY-hidden')
		}
	}

	menuClick(e) {
		e.preventDefault()
		window.scrollTo({top: 0})
	}

	init() {
		this.burger.addEventListener('click', () => this.burgerClick())
		this.headerLink.forEach(el => {
			el.addEventListener('click', () => this.burgerClick())
			if(el.classList.contains('menu__link-active')) {
				el.addEventListener('click', this.menuClick)
			}
		})
		this.headerShadow.addEventListener('click', () => this.burgerClick())
	}
}