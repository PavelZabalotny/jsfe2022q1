import './_style.scss'
import Controller from '../../../app/Controller'
import { ICar, IComponent } from '../../../types'
import { createElement } from '../../../common/utils'
import { carSVG } from '../../../common/carSVG'

export default class CarWithEnvironment implements IComponent {
  element: ICar
  controller: Controller

  constructor(element: ICar, controller: Controller) {
    this.element = element
    this.controller = controller
  }

  render() {
    const car = createElement({
      tagName: 'div',
      classes: 'car',
      attributes: {
        id: `${this.element.id}`,
        color: `${this.element.color}`,
        carName: `${this.element.name}`,
      },
    })
    const carChangeContainer = createElement({ tagName: 'div', classes: 'car__change' })

    const carSelectButton = createElement({
      tagName: 'button',
      classes: ['bnt', 'btn__select'],
      text: 'Select',
    })
    carSelectButton.addEventListener('click', (e) => {
      this.controller.handleSelectCar(e)
    })

    const carRemoveButton = createElement({
      tagName: 'button',
      classes: ['bnt', 'btn__remove'],
      text: 'Remove',
    })
    carRemoveButton.addEventListener('click', () => {
      this.controller.handleRemoveCar(this.element.id)
    })

    const carName = createElement({ tagName: 'div', classes: 'car__name', text: this.element.name })

    carChangeContainer.append(carSelectButton, carRemoveButton, carName)

    const carRace = createElement({ tagName: 'div', classes: 'car__race' })
    const carDriveButtons = createElement({ tagName: 'div', classes: 'car__drive-buttons' })
    const carStartButton = createElement({
      tagName: 'button',
      classes: ['btn', 'car__start'],
      text: 'A',
    })
    const carStopButton = createElement({
      tagName: 'button',
      classes: ['btn', 'car__stop'],
      text: 'B',
    })
    carDriveButtons.append(carStartButton, carStopButton)
    const carImage = createElement({
      tagName: 'div',
      classes: ['car__image'],
      text: `${this.element.color}`,
    })
    carImage.innerHTML = carSVG(this.element.color)
    const finnishFlag = createElement({ tagName: 'div', classes: 'car__flag' })
    const carTrack = createElement({ tagName: 'div', classes: 'car__track' })
    carTrack.append(carImage, finnishFlag)

    carRace.append(carDriveButtons, carTrack)

    car.append(carChangeContainer, carRace)

    return car
  }
}
