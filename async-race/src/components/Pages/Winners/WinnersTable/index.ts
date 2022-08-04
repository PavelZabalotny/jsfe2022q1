import './_style.scss'
import { IComponent } from '../../../../types'
import { createElement } from '../../../../common/utils'
import { carSVG } from '../../../../common/carSVG'
import Controller from '../../../../app/Controller'

export default class WinnersTable implements IComponent {
  controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  render() {
    const { items, sortBy, sortOrder } = this.controller.model.state.winners
    const tableRowNames = ['Number', 'Car', 'Name', 'Wins', 'Best-time']

    const rowNames = tableRowNames.map((text) => {
      const element = createElement({
        tagName: 'div',
        classes: [`winners__${text.toLowerCase()}`, 'table__name'],
        text,
      })

      if (text === 'Best-time') {
        element.addEventListener('click', (e) => this.controller.handleWinnersOrder(e, 'time'))
      }

      if (text === 'Wins') {
        element.addEventListener('click', (e) => this.controller.handleWinnersOrder(e, 'wins'))
      }

      const sortOrderArrow = sortOrder === 'ASC' ? '&#8595;' : '&#8593;'

      switch (sortBy) {
        case 'wins':
          if (text === 'Wins') {
            element.innerHTML = `${text} ${sortOrderArrow}`
          }
          break
        case 'time':
          if (text === 'Best-time') {
            element.innerHTML = `${text} ${sortOrderArrow}`
          }
          break
        default:
          console.log('Sort condition not found in switch')
      }

      return element
    })

    const winnersCars = items
      .map(({ /* id,  */ name, wins, time, color }, index) => {
        const carNumber = createElement({
          tagName: 'div',
          classes: ['table__cell'],
          text: `${index + 1}`,
        })

        const carImage = createElement({
          tagName: 'div',
          classes: ['table__cell', 'table__car'],
          text: `${color}`,
        })
        carImage.innerHTML = carSVG(color)

        const carName = createElement({
          tagName: 'div',
          classes: ['table__cell'],
          text: name,
        })

        const carWins = createElement({
          tagName: 'div',
          classes: ['table__cell'],
          text: `${wins}`,
        })

        const carTime = createElement({
          tagName: 'div',
          classes: ['table__cell'],
          text: `${time}`,
        })

        return [carNumber, carImage, carName, carWins, carTime]
      })
      .flat()

    const winnerTable = createElement({ tagName: 'div', classes: 'winners__table' })
    winnerTable.append(...rowNames, ...winnersCars)

    return winnerTable
  }
}
