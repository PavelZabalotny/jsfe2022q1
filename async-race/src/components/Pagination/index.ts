import './_style.scss'
import Controller from '../../app/Controller'
import { IComponent } from '../../types'
import { getPagination } from '../../common/utils'

export default class Pagination implements IComponent {
  type: 'Garage' | 'Winners'
  controller: Controller

  constructor(type: 'Garage' | 'Winners', controller: Controller) {
    this.type = type
    this.controller = controller
  }

  render() {
    const currentView = this.type === 'Garage' ? 'cars' : 'winners'
    const {
      model: {
        state: {
          [currentView]: { page, count },
        },
      },
    } = this.controller

    const MAX_CARS_PER_PAGE = this.type === 'Garage' ? 7 : 10

    const pagination = getPagination({
      type: this.type,
      page,
      carsCount: count,
      carsPerPage: MAX_CARS_PER_PAGE,
      handleClick: this.controller.handlePaginationClickButton.bind(this.controller),
    })

    return pagination
  }
}
