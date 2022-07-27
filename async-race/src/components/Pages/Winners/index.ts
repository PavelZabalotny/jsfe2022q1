import { createElement } from '../../../common/utils'

export default class Winners {
  render() {
    const element = createElement({
      tagName: 'div',
      classes: 'main__winners',
      text: 'Winners page',
    })
    return element
  }
}
