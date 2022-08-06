import { createElement } from './index'

type Pagination = {
  type: 'Garage' | 'Winners'
  page: number
  carsCount: number
  carsPerPage: number
  handleClick: (type: 'Garage' | 'Winners', button: 'Prev' | 'Next') => void
}

export default function getPagination({
  type,
  page,
  carsCount,
  carsPerPage,
  handleClick,
}: Pagination) {
  const pagination = createElement({ tagName: 'div', classes: 'pagination' })
  const pagesCount = Math.ceil(carsCount / carsPerPage)

  const buttons = ['Prev', 'Next'].map((text) => {
    const button = createElement({
      tagName: 'button',
      classes: ['btn', `pagination__${text}`],
      text,
    })

    if (text === 'Prev') {
      button.addEventListener('click', () => {
        handleClick(type, 'Prev')
      })
      if (page === 1) {
        button.setAttribute('disabled', 'true')
      } else {
        button.removeAttribute('disabled')
      }
    }

    if (text === 'Next') {
      button.addEventListener('click', () => {
        handleClick(type, 'Next')
      })
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
