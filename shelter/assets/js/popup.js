export default class {
	constructor(modalTargets, petsArray) {
		this.modalTargets = modalTargets
		this.petsArray = petsArray
	}

	init() {
		this.modalTargets.forEach(el => {
			el.addEventListener('click', (e) => {
				this.handleClick(e)
			})
		})
	}

	handleClose(e) {
		if (e.target.dataset.role === 'close' || e.target.dataset.role === 'modal') {
			e.currentTarget.classList.remove('opacity-1')
			setTimeout(() => {
				document.querySelector('.modal').remove()
				document.body.classList.remove('overflowY-hidden')
			}, 200)
		}
	}

	handleHoverCloseButton(e, type, modalTarget) {
		if (e.target.dataset.role === 'modal' && type === 'mouseover') {
			modalTarget.classList.add('modal__close--hover')
		}
		if (e.target.dataset.role === 'modal' && type === 'mouseout') {
			modalTarget.classList.remove('modal__close--hover')
		}
	}

	handleClick(e) {
		const otherModal = document.body.querySelector('.modal')
		if (otherModal) {
			otherModal.remove()
		}

		const pets = this.petsArray.filter(({name}) => name === e.currentTarget.dataset.name)[0]
		const modal = `
<div class="modal" data-role="modal">
  <div class="modal__window">
    <div class="modal__close" data-role="close"></div>
    <img class="modal__image" src="${pets.img}" alt="${pets.name}">
    <div class="modal__content">
      <div class="modal__block">
        <h3 class="modal__title">${pets.name}</h3>
        <h4 class="modal__subtitle">${pets.type} - ${pets.breed}</h4>
      </div>
      <h5 class="modal__text">${pets.description}</h5>
      <ul class="list">
        <li class="list__item"><h5><b>Age: </b>${pets.age}</h5></li>
        <li class="list__item"><h5><b>Inoculations: </b>${pets.inoculations.join(', ')}</h5></li>
        <li class="list__item"><h5><b>Diseases: </b>${pets.diseases.join(', ')}</h5></li>
        <li class="list__item"><h5><b>Parasites: </b>${pets.parasites.join(', ')}</h5></li>
      </ul>
    </div>
  </div>
</div>`
		document.body.insertAdjacentHTML('beforeend', modal)

		document.body.classList.add('overflowY-hidden')

		const backOut = document.querySelector('.modal')

		setTimeout(() => {
			backOut.classList.add('opacity-1')
		}, 0)

		backOut.addEventListener('click', this.handleClose)

		const modalCloseButton = document.querySelector('.modal__close')
		backOut.addEventListener('mouseover', (e) => this.handleHoverCloseButton(e, 'mouseover', modalCloseButton))
		backOut.addEventListener('mouseout', (e) => this.handleHoverCloseButton(e, 'mouseout', modalCloseButton))
	}
}