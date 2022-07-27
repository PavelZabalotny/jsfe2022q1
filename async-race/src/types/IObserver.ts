import IState from './IState'

export default interface IObserver {
  update(state: IState): void
}
