import { createElement } from '../../common/utils'

export default class PageInformTitles {
  pageView: 'Garage' | 'Winners'
  carCount: number
  pageNumber: number

  constructor(page: 'Garage' | 'Winners', count: number, number: number) {
    this.pageView = page
    this.carCount = count
    this.pageNumber = number
  }

  render() {
    const pageTitleText = `${this.pageView} (${this.carCount})`
    const pageNumberText = `Page #${this.pageNumber}`
    const pageTitle = createElement({ tagName: 'h2', classes: 'pageTitle', text: pageTitleText })
    const pageNumber = createElement({ tagName: 'h3', classes: 'pageNumber', text: pageNumberText })

    const pageInformElements = createElement({ tagName: 'div', classes: 'main__inform-titles' })
    pageInformElements.append(pageTitle, pageNumber)

    return pageInformElements
  }
}
