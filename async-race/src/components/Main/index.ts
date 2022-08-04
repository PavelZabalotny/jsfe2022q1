import './_style.scss'
import { createElement, safeQuerySelector } from '../../common/utils'
import { IObserver, IState, TTypeNotifyObservers } from '../../types'
// import Controller from '../../app/Controller'

export default class Main implements IObserver {
  update(state: IState, type: TTypeNotifyObservers): void {
    if (type && type.length && !type.includes('All')) {
      return
    }

    console.log('main updated')
    const mainDOMLink = safeQuerySelector<HTMLElement>('main')
    // mainDOMLink.innerHTML = ''
    const wrapper = createElement({ tagName: 'div', classes: 'wrapper' })

    // state.currentView === 'Garage' ? this.garagePage : this.winnersPage
    // wrapper.append(this.garagePage, this.winnersPage)
    mainDOMLink.append(wrapper)
  }
}
