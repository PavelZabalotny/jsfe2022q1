import './_style.scss'
import Controller from '../../../app/Controller'
import { createElement, safeQuerySelector } from '../../../common/utils'
import { IObserver, IState, TTypeNotifyObservers } from '../../../types'
// import Cars from '../../Cars'
import PageInformTitles from '../../PageInformTitles'

export default class Garage implements IObserver {
  controller: Controller
  garageInformTitles: HTMLElement
  // cars: HTMLElement

  // mainDOMLink: HTMLElement

  constructor(controller: Controller) {
    this.controller = controller
    this.garageInformTitles = new PageInformTitles(
      'Garage',
      this.controller.model.state.cars.count,
      this.controller.model.state.cars.page
    ).render()
    // this.cars = new Cars(controller).render()
  }

  update(state: IState, type: TTypeNotifyObservers) {
    if (type && type.length && !type.includes('All') && !type.includes('Garage')) {
      return
    }
    console.log('Garage updated')
    const mainDOMLink = safeQuerySelector<HTMLElement>('.main .wrapper')
    const element = createElement({
      tagName: 'div',
      classes: 'main__garage',
    })
    // const cars = new Cars(state).render()
    element.append(this.garageInformTitles)

    mainDOMLink.append(element)
  }
}
