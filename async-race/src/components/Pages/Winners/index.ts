import './_style.scss'
import { createElement, safeQuerySelector } from '../../../common/utils'
import Controller from '../../../app/Controller'
import { IObserver, TTypeNotifyObservers } from '../../../types'
import PageInformTitles from '../../PageInformTitles'
import WinnersTable from './WinnersTable'
import Pagination from '../../Pagination'

export default class Winners implements IObserver {
  controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  update(type: TTypeNotifyObservers) {
    if (type && type.length && !type.includes('All') && !type.includes('Winners')) {
      return
    }
    const mainDOMLink = safeQuerySelector<HTMLElement>('.main .wrapper')
    const mainWinners: HTMLElement | null = mainDOMLink.querySelector('.main__winners')

    if (mainWinners) {
      mainWinners.remove()
    }

    const winnersClasses =
      this.controller.model.state.currentView === 'Garage'
        ? ['main__winners', 'd-none']
        : ['main__winners']

    const element = createElement({
      tagName: 'div',
      classes: winnersClasses,
    })

    const garageInformTitles = new PageInformTitles(
      'Winners',
      this.controller.model.state.winners.count,
      this.controller.model.state.winners.page
    ).render()
    const winnersPagination = new Pagination('Winners', this.controller).render()

    const winnersTable = new WinnersTable(this.controller).render()
    element.append(garageInformTitles, winnersTable, winnersPagination)

    mainDOMLink.append(element)
  }
}
