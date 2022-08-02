import Header from '../components/Header'
import { IComponent, IObserver, IState, IView } from '../types'
import { createElement, safeQuerySelector } from '../common/utils'
import Controller from './Controller'
import Footer from '../components/Footer'
import Main from '../components/Main'

export default class View implements IView {
  controller: Controller
  observers: IObserver[]
  bodyContainer: HTMLBodyElement
  header: IObserver
  main: IObserver
  footer: IComponent

  constructor(controller: Controller) {
    this.controller = controller
    this.observers = []
    this.bodyContainer = safeQuerySelector<HTMLBodyElement>('body')
    this.header = new Header(controller)
    this.main = new Main(controller)
    this.footer = new Footer()
  }

  init() {
    const baseElementsName = ['header', 'main', 'footer']
    const baseElements = baseElementsName.map((elementName) =>
      createElement({ tagName: elementName, classes: elementName })
    )
    this.bodyContainer.append(...baseElements)
    this.footer.render()
    this.controller.model.state.mainDOMLink = safeQuerySelector<HTMLElement>('main')
    const observers = [this.header, this.main]
    this.fillWithObservers(observers)
    this.registerObservers()
    this.controller.model.notifyObservers()
  }

  fillWithObservers(observers: IObserver[]) {
    this.observers.push(...observers)
  }

  registerObservers(): void {
    this.observers.forEach((observer) => {
      this.controller.model.registerObserver(observer)
    })
  }

  updateObservers(state: IState): void {
    if (!this.observers.length) {
      console.log('Nothing to update')
      return
    }

    this.observers.forEach((observer) => {
      observer.update(state)
    })
  }
}
