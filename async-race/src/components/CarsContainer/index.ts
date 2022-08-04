import IComponent from '../../types/IComponent'
import { createElement } from '../../common/utils'
import Controller from '../../app/Controller'
import CarWithEnvironment from './CarWithEnvironment'

export default class CarsContainer implements IComponent {
  controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  render(): HTMLElement {
    const carsContainer = createElement({ tagName: 'div', classes: 'main__cars' })
    // TODO: implement cars items
    const cars = this.controller.model.state.cars.items.map((element) =>
      new CarWithEnvironment(element, this.controller).render()
    )

    carsContainer.append(...cars)

    return carsContainer
  }
}
