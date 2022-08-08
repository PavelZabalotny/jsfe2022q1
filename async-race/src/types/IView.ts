import Controller from '../app/Controller'
import { IObserver } from './index'

export default interface IView {
  controller: Controller
  observers: IObserver[]
  init(): void
  registerObservers(): void
}
