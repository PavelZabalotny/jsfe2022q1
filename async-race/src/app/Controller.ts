import Model from './Model'
import { safeQuerySelector } from '../common/utils'
import { TSortBy } from '../types'
import { getWinners } from '../common/api'

export default class Controller {
  public model: Model

  constructor(model: Model) {
    this.model = model
  }

  headerButtonClickHandler(e: MouseEvent, currentView: 'Garage' | 'Winners') {
    e.stopPropagation()

    console.log('controller eventHandle:', currentView)
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

  handlePaginationClickButton(button: 'Prev' | 'Next') {
    const page =
      button === 'Prev' ? this.model.state.winners.page - 1 : this.model.state.winners.page + 1

    getWinners({ page }).then(({ items, count }) => {
      this.model.state.winners.items = items
      this.model.state.winners.count = count
      this.model.state.winners.page = page
      this.model.notifyObservers(['Winners'])
    })
  }
}
