import './_style.scss'
import Controller from '../../app/Controller'
import { IComponent } from '../../types'
import { getPagination } from '../../common/utils'

const MAX_CARS_PER_PAGE = 10

export default class Pagination implements IComponent {
  controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  render() {
    const currentView = this.controller.model.state.currentView === 'Garage' ? 'cars' : 'winners'
    const {
      model: {
        state: {
          [currentView]: { page, count },
        },
      },
    } = this.controller

    const pagination = getPagination({
      page,
      carsCount: count,
      carsPerPage: MAX_CARS_PER_PAGE,
      handleClick: this.controller.handlePaginationClickButton.bind(this.controller),
    })

    return pagination
  }
}
