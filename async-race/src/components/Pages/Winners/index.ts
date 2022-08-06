import './_style.scss'
import { createElement, safeQuerySelector } from '../../../common/utils'
import Controller from '../../../app/Controller'
import { IObserver, TTypeNotifyObservers } from '../../../types'
import PageInformTitles from '../../PageInformTitles'
import WinnersTable from './WinnersTable'
import Pagination from '../../Pagination'

export default class Winners implements IObserver {
  controller: Controller
  garageInformTitles: HTMLElement

  constructor(controller: Controller) {
    this.controller = controller
    this.garageInformTitles = new PageInformTitles(
      'Winners',
      controller.model.state.winners.count,
      controller.model.state.winners.page
    ).render()
  }

  update(type: TTypeNotifyObservers) {
    if (type && type.length && !type.includes('All') && !type.includes('Winners')) {
      return
    }
    console.log('Winners updated')
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

    const winnersPagination = new Pagination('Winners', this.controller).render()

    const winnersTable = new WinnersTable(this.controller).render()
    element.append(this.garageInformTitles, winnersTable, winnersPagination)

    mainDOMLink.append(element)
  }
}
