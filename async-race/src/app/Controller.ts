import Model from './Model'
import { safeQuerySelector } from '../common/utils'
import { TSortBy } from '../types'
import { createCar, getCars, getWinners } from '../common/api'

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
    if (type === 'create') {
      createCar(carName, carColor).then((status: number) => {
        if (status !== 201) {
          console.log('error with creating Car')
        }
        getCars().then((cars) => {
          this.model.state.cars = cars
          this.model.notifyObservers(['Garage'])
        })
      })
    }
  }
}
