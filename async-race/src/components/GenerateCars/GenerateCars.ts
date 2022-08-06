import Controller from '../../app/Controller'
import { IComponent } from '../../types'
import { createElement } from '../../common/utils'
import { carBrand, carModel } from '../../common/carsData'

export default class GenerateCars implements IComponent {
  controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  render() {
    const generateButton = createElement({
      tagName: 'button',
      classes: ['btn', 'generate-button'],
      text: 'GENERATE CARS',
    })
    generateButton.addEventListener('click', () => {
      this.controller.generateCars(carBrand, carModel)
    })

    return generateButton
  }
}
