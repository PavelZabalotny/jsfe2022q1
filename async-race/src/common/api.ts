import { ICar, IWinnersCar, TEngineStatus } from '../types'
import { ENGINE_URL, GARAGE_URL, WINNERS_URL } from './urls'

const MAX_CARS_PER_PAGE = 7
const MAX_WINNERS_PER_PAGE = 10

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

export const createCar = async (name: string, color: string = '#000000'): Promise<number> => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    name,
    color,
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  }

  const request = await fetch(GARAGE_URL, requestOptions)

  return request.status
}

export const fetchGenerateCar = async (
  name: string,
  color: string = '#000000'
): Promise<Response> => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    name,
    color,
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  }

  return fetch(GARAGE_URL, requestOptions)
}

export const updateCar = async (
  id: number,
  name: string,
  color: string = '#000000'
): Promise<number> => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    name,
    color,
  })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
  }

  const request = await fetch(`${GARAGE_URL}/${id}`, requestOptions)

  return request.status
}

export const deleteCar = async (id: number): Promise<number> => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  }

  const request = await fetch(`${GARAGE_URL}/${id}`, requestOptions)

  return request.status
}

export const deleteWinner = async (id: number): Promise<number> => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  }

  const request = await fetch(`${WINNERS_URL}/${id}`, requestOptions)

  return request.status
}

function getSortOrderQueryParam(sort?: Sort, order?: Order): string {
  if (sort && order) {
    return `&_sort=${sort}&_order=${order}`
  }

  return ''
}

export async function getWinners({
  page = 1,
  limit = MAX_WINNERS_PER_PAGE,
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

export async function startStopEngine(
  id: number,
  status: TEngineStatus
): Promise<{ velocity: number; distance: number }> {
  const requestOptions = {
    method: 'PATCH',
  }
  const url = `${ENGINE_URL}?id=${id}&status=${status}`
  const response = await fetch(url, requestOptions)

  return response.json()
}

export async function driveEngine(carID: number): Promise<boolean> {
  const requestOptions = {
    method: 'PATCH',
  }
  const engineStatus = 'drive'
  const url = `${ENGINE_URL}?id=${carID}&status=${engineStatus}`

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}
