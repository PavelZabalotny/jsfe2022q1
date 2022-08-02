import { ICar } from '../types'
import { GARAGE_URL } from './urls'

const MAX_CARS_PER_PAGE = 7

type getCarsQueryParam = {
  page?: number
  limit?: number
}

export async function getCars({
  page = 1,
  limit = MAX_CARS_PER_PAGE,
}: getCarsQueryParam = {}): Promise<{ items: ICar[] | []; count: number }> {
  const resource = `${GARAGE_URL}?_page=${page}&_limit=${limit}`
  const response = await fetch(resource)

  const items = await response.json()
  const count = +(response.headers.get('X-Total-Count') ?? 0)

  return { items, count }
}
