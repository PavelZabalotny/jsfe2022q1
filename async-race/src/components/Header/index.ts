import './_style.scss'
import { createElement, safeQuerySelector } from '../../common/utils'
import { IObserver, TTypeNotifyObservers } from '../../types'
import Controller from '../../app/Controller'

const BUTTONS_TITLE: ('Garage' | 'Winners')[] = ['Garage', 'Winners']

export default class Header implements IObserver {
  controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  update(type: TTypeNotifyObservers): void {
    if (type && type.length && !type.includes('All') && !type.includes('Header')) {
      return
    }

    console.log('header updated')
    const headerDOMLink = safeQuerySelector<HTMLElement>('header')
    headerDOMLink.innerHTML = ''
    const wrapper = createElement({ tagName: 'div', classes: 'wrapper' })

    BUTTONS_TITLE.forEach((currentView) => {
      wrapper.append(this.createButton(currentView))
    })

    headerDOMLink.append(wrapper)

    document.title = `Async race - ${this.controller.model.state.currentView}`
  }

  createButton(currentView: 'Garage' | 'Winners') {
    const button = createElement({
      tagName: 'button',
      classes: ['btn'],
      text: `To ${currentView}`,
    })

    if (this.controller.model.state.currentView === currentView) {
      button.setAttribute('disabled', 'true')
    }

    button.addEventListener('click', (e) => {
      this.controller.headerButtonClickHandler(e, currentView)
    })

    return button
  }
}
