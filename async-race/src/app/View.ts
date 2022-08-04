import Header from '../components/Header'
import { IComponent, IObserver, IView } from '../types'
import { createElement, safeQuerySelector } from '../common/utils'
import Controller from './Controller'
import Footer from '../components/Footer'
import Main from '../components/Main'
import Garage from '../components/Pages/Garage'
import Winners from '../components/Pages/Winners'

export default class View implements IView {
  controller: Controller
  observers: IObserver[]
  bodyContainer: HTMLBodyElement
  header: IObserver
  garagePage: Garage
  winnersPage: Winners
  main: IObserver
  footer: IComponent

  constructor(controller: Controller) {
    this.controller = controller
    this.observers = []
    this.bodyContainer = safeQuerySelector<HTMLBodyElement>('body')
    this.header = new Header(controller)
    this.garagePage = new Garage(this.controller)
    this.winnersPage = new Winners(this.controller)
    this.main = new Main()
    this.footer = new Footer()
  }

  init() {
    const baseElementsName = ['header', 'main', 'footer']
    const baseElements = baseElementsName.map((elementName) =>
      createElement({ tagName: elementName, classes: elementName })
    )
    this.bodyContainer.append(...baseElements)
    this.footer.render()
    const observers = [this.header, this.main, this.garagePage, this.winnersPage]
    this.fillWithObservers(observers)
    this.registerObservers()
    this.controller.model.notifyObservers(['All'])
  }

  fillWithObservers(observers: IObserver[]) {
    this.observers.push(...observers)
  }

  registerObservers(): void {
    this.observers.forEach((observer) => {
      this.controller.model.registerObserver(observer)
    })
  }

  /* updateObservers(state: IState): void {
    if (!this.observers.length) {
      console.log('Nothing to update')
      return
    }

    this.observers.forEach((observer) => {
      observer.update(state)
    })
  } */
}
