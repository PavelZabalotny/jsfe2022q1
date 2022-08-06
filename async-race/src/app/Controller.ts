import Model from './Model'
import { safeQuerySelector } from '../common/utils'
import { TSortBy } from '../types'
import { createCar, getCars, getWinners, updateCar } from '../common/api'

export default class Controller {
  public model: Model

  constructor(model: Model) {
    this.model = model
  }

  headerButtonClickHandler(e: MouseEvent, currentView: 'Garage' | 'Winners') {
    e.stopPropagation()

    this.model.state = { ...this.model.state, currentView }
    const mainGarageDOMLink = safeQuerySelector<HTMLElement>('.main__garage')
    const mainWinnerDOMLink = safeQuerySelector<HTMLElement>('.main__winners')
    const headerButtons = [mainGarageDOMLink, mainWinnerDOMLink]

    headerButtons.forEach((button) => {
      button.classList.toggle('d-none')
    })

    this.model.notifyObservers(['Header'])
  }

  handleWinnersOrder(sortBy: TSortBy) {
    this.model.state.winners.sortOrder =
      this.model.state.winners.sortOrder === 'ASC' ? 'DESC' : 'ASC'

    getWinners({ sort: sortBy, order: this.model.state.winners.sortOrder }).then(
      ({ items, count, page }) => {
        this.model.state.winners.items = items
        this.model.state.winners.count = count
        this.model.state.winners.page = page
        this.model.state.winners.sortBy = sortBy
        this.model.notifyObservers(['Winners'])
      }
    )
  }

  handlePaginationClickButton(type: 'Garage' | 'Winners', button: 'Prev' | 'Next') {
    const currentPage =
      this.model.state.currentView === 'Garage' ? this.model.state.cars : this.model.state.winners
    const page = button === 'Prev' ? currentPage.page - 1 : currentPage.page + 1

    if (type === 'Garage') {
      getCars({ page }).then(({ items, count }) => {
        currentPage.items = items
        currentPage.count = count
        currentPage.page = page
        this.model.notifyObservers([type])
      })
    }

    if (type === 'Winners') {
      getWinners({ page }).then(({ items, count }) => {
        currentPage.items = items
        currentPage.count = count
        currentPage.page = page
        this.model.notifyObservers([type])
      })
    }
  }

  handleCreateCar(type: 'create' | 'update', carName: string, carColor: string) {
    const name = carName?.trim()

    if (type === 'create' && name) {
      createCar(name, carColor).then((status: number) => {
        if (status !== 201) {
          console.log('error with creating Car')
        }
        getCars().then((cars) => {
          this.model.state.cars = cars
          this.model.notifyObservers(['Garage'])
        })
      })
    }

    if (type === 'update') {
      this.handleUpdateCar()
    }
  }

  handleUpdateCar() {
    let carName: string = ''
    let carColor: string = ''

    const updateCarDOMLink = safeQuerySelector<HTMLElement>('.update-car')
    const id = updateCarDOMLink.getAttribute('id')
    const updateCarChildren = updateCarDOMLink.children

    for (let i = 0; i < updateCarChildren.length; i += 1) {
      const element = updateCarChildren[i]

      if (element.className.includes('name')) {
        carName = (element as HTMLInputElement).value
      }
      if (element.className.includes('color')) {
        carColor = (element as HTMLInputElement).value
      }
    }

    if (id && carName && carColor) {
      updateCar(+id, carName, carColor).then((status: number) => {
        if (status !== 200) {
          console.log('error with updating Car')
        }
        getCars().then((cars) => {
          this.model.state.cars = cars
          this.model.notifyObservers(['Garage'])
        })
      })
    }
  }

  handleSelectCar(e: MouseEvent) {
    const target = e.target as HTMLElement
    const car: HTMLElement | null = target.closest('.car')

    if (car) {
      const id = car.getAttribute('id')
      const carName = car.getAttribute('carName')
      const color = car.getAttribute('color')

      if (id && carName && color) {
        const updateCarDOMLink = safeQuerySelector<HTMLElement>('.update-car')
        updateCarDOMLink.setAttribute('id', id)
        const updateCarChildren = updateCarDOMLink.children

        for (let i = 0; i < updateCarChildren.length; i += 1) {
          const element = updateCarChildren[i]
          element.removeAttribute('disabled')
          if (element.className.includes('name')) {
            ;(element as HTMLInputElement).value = carName
          }
          if (element.className.includes('color')) {
            ;(element as HTMLInputElement).value = color
          }
        }
      }
    }
  }
}
