import './_style.scss'
import Controller from '../../../app/Controller'
import { createElement, safeQuerySelector } from '../../../common/utils'
import { IObserver, TTypeNotifyObservers } from '../../../types'
import CarsContainer from '../../CarsContainer'
import PageInformTitles from '../../PageInformTitles'
import Pagination from '../../Pagination'
import CreateCarInput from '../../CreateCarInput'
import GenerateCars from '../../GenerateCars/GenerateCars'
import ResetCars from '../../ResetCars'
import Race from '../../Race'

export default class Garage implements IObserver {
  controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  update(type: TTypeNotifyObservers) {
    if (type && type.length && !type.includes('All') && !type.includes('Garage')) {
      return
    }
    console.log('Garage updated')
    const mainDOMLink = safeQuerySelector<HTMLElement>('.main .wrapper')

    const mainGarage: HTMLElement | null = mainDOMLink.querySelector('.main__garage')

    if (mainGarage) {
      mainGarage.remove()
    }

    const element = createElement({
      tagName: 'div',
      classes: 'main__garage',
    })

    const createCarInput = new CreateCarInput('create', this.controller).render()
    const updateCarInput = new CreateCarInput('update', this.controller).render()

    const garageInformTitles = new PageInformTitles(
      'Garage',
      this.controller.model.state.cars.count,
      this.controller.model.state.cars.page
    ).render()

    const carsContainer = new CarsContainer(this.controller).render()

    const garagePagination = new Pagination('Garage', this.controller).render()

    const raceButton = new Race(this.controller).render()
    const resetButton = new ResetCars(this.controller).render()
    const generateButton = new GenerateCars(this.controller).render()

    element.append(
      createCarInput,
      updateCarInput,
      generateButton,
      raceButton,
      resetButton,
      garageInformTitles,
      carsContainer,
      garagePagination
    )

    mainDOMLink.append(element)
  }
}
