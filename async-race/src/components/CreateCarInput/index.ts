import Controller from '../../app/Controller'
import { IComponent } from '../../types'
import { createElement } from '../../common/utils'

export default class CreateCarInput implements IComponent {
  type: 'create' | 'update'
  controller: Controller

  constructor(type: 'create' | 'update', controller: Controller) {
    this.type = type
    this.controller = controller
  }

  render() {
    let carColor: string
    let carName: string

    const containerClass = this.type === 'create' ? 'create-car' : 'update-car'

    const container = createElement({ tagName: 'div', classes: containerClass })
    const inputName = createElement({ tagName: 'input', classes: `${containerClass}__input-name` })
    inputName.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement
      carName = target.value
    })

    const inputColor = createElement({
      tagName: 'input',
      classes: `${containerClass}__input-color`,
      attributes: { type: 'color' },
    })
    inputColor.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement
      carColor = target.value
    })

    const button = createElement({
      tagName: 'button',
      classes: `${containerClass}__button`,
      text: this.type.toUpperCase(),
    })
    button.addEventListener('click', () => {
      this.controller.handleCreateCar(this.type, carName, carColor)
    })

    if (this.type === 'update') {
      ;[inputName, inputColor, button].forEach((element) => {
        element.setAttribute('disabled', 'true')
      })
    }

    container.append(inputName, inputColor, button)

    return container
  }
}
