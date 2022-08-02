import './_style.scss'
import { createElement, safeQuerySelector } from '../../common/utils'
import { IObserver, IState } from '../../types'
import Controller from '../../app/Controller'

const BUTTONS_TITLE: ('Garage' | 'Winners')[] = ['Garage', 'Winners']

export default class Header implements IObserver {
  controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  update(state: IState): void {
    console.log('header updated')
    const headerDOMLink = safeQuerySelector<HTMLElement>('header')
    headerDOMLink.innerHTML = ''
    const wrapper = createElement({ tagName: 'div', classes: 'wrapper' })

    BUTTONS_TITLE.forEach((title) => {
      wrapper.append(this.createButton(title))
    })

    headerDOMLink.append(wrapper)

    document.title = `Async race - ${state.currentView}`
  }

  createButton(title: 'Garage' | 'Winners') {
    const button = createElement({ tagName: 'button', classes: ['btn'], text: `To ${title}` })

    button.addEventListener('click', (e) => {
      this.controller.headerButtonClickHandler(e, title)
    })

    return button
  }
}
