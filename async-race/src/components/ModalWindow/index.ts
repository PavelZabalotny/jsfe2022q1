import './_style.scss'
import { IComponent } from '../../types'
import { createElement } from '../../common/utils'

export default class ModalWindow implements IComponent {
  render() {
    const modal = createElement({ tagName: 'div', classes: 'modal' })

    return modal
  }
}
