import { TTypeNotifyObservers } from '.'
import IObserver from './IObserver'
import IState from './IState'

export default interface IModel {
  state: IState
  registerObserver(observer: IObserver): void
  notifyObservers(type: TTypeNotifyObservers): void
}
