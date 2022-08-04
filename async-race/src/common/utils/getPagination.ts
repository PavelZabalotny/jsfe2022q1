import { createElement } from './index'

type Pagination = {
  page: number
  carsCount: number
  carsPerPage: number
  handleClick: (button: 'Prev' | 'Next') => void
}
export default function getPagination({ page, carsCount, carsPerPage, handleClick }: Pagination) {
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
        handleClick('Prev')
      })
      if (page === 1) {
        button.setAttribute('disabled', 'true')
      } else {
        button.removeAttribute('disabled')
      }
    }

    if (text === 'Next') {
      button.addEventListener('click', () => {
        handleClick('Next')
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
