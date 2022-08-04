import { ICar, IWinnersCar } from '../types'
import { GARAGE_URL, WINNERS_URL } from './urls'

const MAX_CARS_PER_PAGE = 7

type getCarsQueryParam = {
  page?: number
  limit?: number
}

export async function getCars({
  page = 1,
  limit = MAX_CARS_PER_PAGE,
}: getCarsQueryParam = {}): Promise<{
  items: ICar[] | []
  page: number
  count: number
}> {
  const resource = `${GARAGE_URL}?_page=${page}&_limit=${limit}`
  const response = await fetch(resource)

  const items = await response.json()
  const count = +(response.headers.get('X-Total-Count') ?? 0)

  return { items, page, count }
}

export const getCar = async (id: number): Promise<ICar> =>
  (await fetch(`${GARAGE_URL}/${id}`)).json()

type Sort = 'id' | 'wins' | 'time'
type Order = 'ASC' | 'DESC'

type getWinnersCarQueryParam = {
  page?: number
  limit?: number
  sort?: Sort
  order?: Order
}

function getSortOrderQueryParam(sort?: Sort, order?: Order): string {
  if (sort && order) {
    return `&_sort=${sort}&_order=${order}`
  }

  return ''
}

export async function getWinners({
  page = 1,
  limit = 10,
  sort = 'time',
  order = 'ASC',
}: getWinnersCarQueryParam = {}): Promise<{
  items: (IWinnersCar & ICar)[] | []
  page: number
  count: number
}> {
  const resource = `${WINNERS_URL}?_page=${page}&_limit=${limit}${getSortOrderQueryParam(
    sort,
    order
  )}`
  const response = await fetch(resource)

  const winnerItems: IWinnersCar[] | [] = await response.json()
  const items: (IWinnersCar & ICar)[] | [] = await Promise.all(
    winnerItems.map(async (winner) => ({ ...winner, ...(await getCar(winner.id)) }))
  )
  const count = +(response.headers.get('X-Total-Count') ?? 0)

  return { items, page, count }
}
