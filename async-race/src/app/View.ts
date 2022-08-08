import Header from '../components/Header'
import { IComponent, IObserver, IView } from '../types'
import { createElement, safeQuerySelector } from '../common/utils'
import Controller from './Controller'
import Footer from '../components/Footer'
import Main from '../components/Main'
import Garage from '../components/Pages/Garage'
import Winners from '../components/Pages/Winners'
import ModalWindow from '../components/ModalWindow'

export default class View implements IView {
  controller: Controller
  observers: IObserver[]
  bodyContainer: HTMLBodyElement
  header: IObserver
  garagePage: Garage
  winnersPage: Winners
  main: IObserver
  footer: IComponent
  modal: HTMLElement

  constructor(controller: Controller) {
    this.controller = controller
    this.observers = []
    this.bodyContainer = safeQuerySelector<HTMLBodyElement>('body')
    this.header = new Header(controller)
    this.garagePage = new Garage(this.controller)
    this.winnersPage = new Winners(this.controller)
    this.main = new Main()
    this.footer = new Footer()
    this.modal = new ModalWindow().render()
  }

  init() {
    const baseElementsName = ['header', 'main', 'footer']
    const baseElements = baseElementsName.map((elementName) =>
      createElement({ tagName: elementName, classes: elementName })
    )
    this.bodyContainer.append(...baseElements)
    this.bodyContainer.insertAdjacentElement('beforeend', this.modal)
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
}
