import './_style.scss'
import { createElement, safeQuerySelector } from '../../common/utils'
import { IObserver, TTypeNotifyObservers } from '../../types'

export default class Main implements IObserver {
  update(type: TTypeNotifyObservers): void {
    if (type && type.length && !type.includes('All')) {
      return
    }

    const mainDOMLink = safeQuerySelector<HTMLElement>('main')
    const wrapper = createElement({ tagName: 'div', classes: 'wrapper' })

    mainDOMLink.append(wrapper)
  }
}
