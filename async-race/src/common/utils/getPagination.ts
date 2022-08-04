import { createElement } from './index'
import { TSortBy, TSortOrder } from '../../types'

type Pagination = {
  page: number
  carsCount: number
  carsPerPage: number
  sortBy: TSortBy
  sortOrder: TSortOrder
}
export default function getPagination({
  page,
  carsCount,
  carsPerPage,
  sortBy,
  sortOrder,
}: Pagination) {
  const pagination = createElement({ tagName: 'div', classes: 'pagination' })
  const pagesCount = Math.ceil(carsCount / carsPerPage)

  const buttons = ['Prev', 'Next'].map((text) => {
    const button = createElement({
      tagName: 'button',
      classes: ['btn', `pagination__${text}`],
      text,
    })

    console.log({ page, carsCount, carsPerPage })

    if (text === 'Prev') {
      // TODO: add Event Listener
      if (page === 1) {
        button.setAttribute('disabled', 'true')
      } else {
        button.removeAttribute('disabled')
      }
    }

    if (text === 'Next') {
      // TODO: add Event Listener
      if (page === pagesCount) {
        button.setAttribute('disabled', 'true')
      } else {
        button.removeAttribute('disabled')
      }
    }

    return button
  })

  pagination.append(...buttons)

  return pagination
}
