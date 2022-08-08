import { IState, IObserver, IModel, TTypeNotifyObservers } from '../types'
import { initState } from './InitialState'

export default class Model implements IModel {
  public state: IState
  private observers: IObserver[]

  constructor() {
    this.state = initState
    this.observers = []
  }

  registerObserver(observer: IObserver) {
    const isExist = this.observers.includes(observer)
    if (isExist) {
      throw new Error('Observer already exist!')
    }

    this.observers.push(observer)
  }

  notifyObservers(type: TTypeNotifyObservers) {
    if (!this.observers.length) {
      throw new Error('The Model has no Observers to notify!')
    }

    this.observers.forEach((observer) => {
      observer.update(type)
    })
  }
}
