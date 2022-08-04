import { IWinnersCar, TSortBy, TSortOrder } from '.'
import ICar from './ICar'

export default interface IState {
  currentView: 'Garage' | 'Winners'
  cars: {
    items: ICar[] | []
    count: number
    page: number
  }
  winners: {
    items: (IWinnersCar & ICar)[] | []
    count: number
    page: number
    sortBy: TSortBy
    sortOrder: TSortOrder
  }
}
