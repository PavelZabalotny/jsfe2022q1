import './_style.scss'
import { createElement, safeQuerySelector } from '../../common/utils'
import { IObserver, IState } from '../../types'
import Controller from '../../app/Controller'
import Garage from '../Pages/Garage'
import Winners from '../Pages/Winners'

export default class Main implements IObserver {
  controller: Controller
  garagePage: HTMLElement
  winnersPage: HTMLElement

  constructor(controller: Controller) {
    this.controller = controller
    this.garagePage = new Garage().render()
    this.winnersPage = new Winners().render()
  }

  update(state: IState): void {
    console.log('main updated')
    const mainDOMLink = safeQuerySelector<HTMLElement>('main')
    mainDOMLink.innerHTML = ''
    const wrapper = createElement({ tagName: 'div', classes: 'wrapper' })

    const container = state.currentPage === 'Garage' ? this.garagePage : this.winnersPage
    wrapper.append(container)
    mainDOMLink.append(wrapper)
  }
}
