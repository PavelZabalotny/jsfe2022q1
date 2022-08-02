import ICar from './ICar'

export default interface IState {
  currentView: 'Garage' | 'Winners'
  cars: {
    items: ICar[] | []
    count: number
    page: number
  }
  winners: {
    /* items: ICar[] | []
    count: number
    page: number */
  }
  mainDOMLink?: HTMLElement
}
