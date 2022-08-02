import { IState, IObserver, IModel } from '../types'
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
      console.log('Observer already exist!')
      return
    }

    console.log('Observer is attached:', observer)
    this.observers.push(observer)
  }

  notifyObservers() {
    if (!this.observers.length) {
      console.log(
        '🚀 ~ file: Model.ts ~ line 34 ~ Model ~ notifyObservers ~ observers',
        this.observers
      )
      console.log('The Model has no Observers to notify!')
      return
    }

    this.observers.forEach((observer) => {
      observer.update(this.state)
    })
  }
}
