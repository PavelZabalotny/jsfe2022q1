import { IComponent } from '../../types'
import { createElement } from '../../common/utils'
import Controller from '../../app/Controller'

export default class ResetCars implements IComponent {
  controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  render() {
    const resetButton = createElement({
      tagName: 'button',
      classes: ['btn', 'reset-button'],
      text: 'RESET',
      attributes: { disabled: 'true' },
    })
    resetButton.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement
      this.controller.handleResetCars(target)
    })

    return resetButton
  }
}
