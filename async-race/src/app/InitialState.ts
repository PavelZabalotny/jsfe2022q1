import { getCars } from '../common/api'
import { IState } from '../types'

const { items: carsItems, count: carsCount } = await getCars()

export const initState: IState = {
  currentView: 'Garage',
  cars: {
    items: carsItems,
    count: carsCount,
    page: 1,
  },
  winners: {},
}
