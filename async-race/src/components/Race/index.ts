import { IComponent } from '../../types'
import { createElement } from '../../common/utils'
import Controller from '../../app/Controller'

export default class Race implements IComponent {
  controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  render() {
    const resetButton = createElement({
      tagName: 'button',
      classes: ['btn', 'race-button'],
      text: 'RACE',
    })
    resetButton.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      this.controller.handleRace(target)
    })

    return resetButton
  }
}
