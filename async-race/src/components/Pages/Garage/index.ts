import { createElement } from '../../../common/utils'

export default class Garage {
  render() {
    const element = createElement({
      tagName: 'div',
      classes: 'main__garage',
      text: 'Garage page',
    })

    return element
  }
}
