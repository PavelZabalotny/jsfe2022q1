import IState from './IState'
import { TTypeNotifyObservers } from '.'

export default interface IObserver {
  update(state: IState, type: TTypeNotifyObservers): void
}
