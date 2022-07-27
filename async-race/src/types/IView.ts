import Controller from '../app/Controller'
import { IObserver, IState } from './index'

export default interface IView {
  controller: Controller
  observers: IObserver[]
  init(): void
  registerObservers(): void
  updateObservers(state: IState): void
}
