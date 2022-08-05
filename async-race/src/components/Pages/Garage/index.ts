import './_style.scss'
import Controller from '../../../app/Controller'
import { createElement, safeQuerySelector } from '../../../common/utils'
import { IObserver, IState, TTypeNotifyObservers } from '../../../types'
import CarsContainer from '../../CarsContainer'
import PageInformTitles from '../../PageInformTitles'
import Pagination from '../../Pagination'

export default class Garage implements IObserver {
  controller: Controller
  garageInformTitles: HTMLElement

  constructor(controller: Controller) {
    this.controller = controller
    this.garageInformTitles = new PageInformTitles(
      'Garage',
      this.controller.model.state.cars.count,
      this.controller.model.state.cars.page
    ).render()
  }

  update(state: IState, type: TTypeNotifyObservers) {
    if (type && type.length && !type.includes('All') && !type.includes('Garage')) {
      return
    }
    console.log('Garage updated') // FIXME: remove console
    const mainDOMLink = safeQuerySelector<HTMLElement>('.main .wrapper')

    const mainGarage: HTMLElement | null = mainDOMLink.querySelector('.main__garage')

    if (mainGarage) {
      mainGarage.remove()
    }

    const element = createElement({
      tagName: 'div',
      classes: 'main__garage',
    })
    const carsContainer = new CarsContainer(this.controller).render()

    // TODO: add pagination
    const garagePagination = new Pagination(this.controller).render()

    element.append(this.garageInformTitles, carsContainer, garagePagination)

    mainDOMLink.append(element)
  }
}
