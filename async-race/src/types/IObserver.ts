import { TTypeNotifyObservers } from '.'

export default interface IObserver {
  update(type: TTypeNotifyObservers): void
}
