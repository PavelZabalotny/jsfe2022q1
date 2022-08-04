import { getCars, getWinners } from '../common/api'
import { IState } from '../types'

const { items: carItems, page: carPage, count: carCount } = await getCars()
const { items: winnerItems, page: winnerPage, count: winnerCount } = await getWinners()

export const initState: IState = {
  currentView: 'Garage',
  cars: {
    items: carItems,
    page: carPage,
    count: carCount,
  },
  winners: {
    items: winnerItems,
    page: winnerPage,
    count: winnerCount,
    sortBy: 'time',
    sortOrder: 'ASC',
  },
}
