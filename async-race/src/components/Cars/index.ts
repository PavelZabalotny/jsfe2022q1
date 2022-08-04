import IComponent from '../../types/IComponent'
import { createElement } from '../../common/utils'
import PageInformTitles from '../PageInformTitles'
import { IState } from '../../types'

export default class Cars implements IComponent {
  garageInformTitles: HTMLElement

  constructor(state: IState) {
    this.garageInformTitles = new PageInformTitles(
      'Garage',
      state.cars.count,
      state.cars.page
    ).render()
  }

  render(): HTMLElement {
    const carsContainer = createElement({ tagName: 'div', classes: 'main__cars' })
    const innerElements = [this.garageInformTitles]
    carsContainer.append(...innerElements)

    return carsContainer
  }
}
