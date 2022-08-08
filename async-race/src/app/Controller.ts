import Model from './Model'
import { animation, getRandomColor, randomFromArray, safeQuerySelector } from '../common/utils'
import { TSortBy } from '../types'
import {
  createCar,
  deleteCar,
  deleteWinner,
  fetchGenerateCar,
  getCars,
  getWinners,
  updateCar,
  startStopEngine,
  driveEngine,
} from '../common/api'

export default class Controller {
  public model: Model

  constructor(model: Model) {
    this.model = model
  }

  headerButtonClickHandler(currentView: 'Garage' | 'Winners') {
    this.model.state = { ...this.model.state, currentView }
    const mainGarageDOMLink = safeQuerySelector<HTMLElement>('.main__garage')
    const mainWinnerDOMLink = safeQuerySelector<HTMLElement>('.main__winners')
    const headerButtons = [mainGarageDOMLink, mainWinnerDOMLink]

    headerButtons.forEach((button) => {
      button.classList.toggle('d-none')
    })

    this.model.notifyObservers(['Header'])
  }

  handleWinnersOrder(sortBy: TSortBy) {
    this.model.state.winners.sortOrder =
      this.model.state.winners.sortOrder === 'ASC' ? 'DESC' : 'ASC'

    getWinners({ sort: sortBy, order: this.model.state.winners.sortOrder }).then(
      ({ items, count, page }) => {
        this.model.state.winners.items = items
        this.model.state.winners.count = count
        this.model.state.winners.page = page
        this.model.state.winners.sortBy = sortBy
        this.model.notifyObservers(['Winners'])
      }
    )
  }

  handlePaginationClickButton(type: 'Garage' | 'Winners', button: 'Prev' | 'Next') {
    const currentPage =
      this.model.state.currentView === 'Garage' ? this.model.state.cars : this.model.state.winners
    const page = button === 'Prev' ? currentPage.page - 1 : currentPage.page + 1

    if (type === 'Garage') {
      getCars({ page }).then(({ items, count }) => {
        currentPage.items = items
        currentPage.count = count
        currentPage.page = page
        this.model.notifyObservers([type])
      })
    }

    if (type === 'Winners') {
      getWinners({ page }).then(({ items, count }) => {
        currentPage.items = items
        currentPage.count = count
        currentPage.page = page
        this.model.notifyObservers([type])
      })
    }
  }

  handleCreateCar(type: 'create' | 'update', carName: string, carColor: string) {
    const name = carName?.trim()

    if (type === 'create' && name) {
      createCar(name, carColor).then((status: number) => {
        this.getCars(status, 201, 'error with creating Car')
      })
    }

    if (type === 'update') {
      this.handleUpdateCar()
    }
  }

  handleUpdateCar() {
    let carName: string = ''
    let carColor: string = ''

    const updateCarDOMLink = safeQuerySelector<HTMLElement>('.update-car')
    const id = updateCarDOMLink.getAttribute('id')
    const updateCarChildren = updateCarDOMLink.children

    for (let i = 0; i < updateCarChildren.length; i += 1) {
      const element = updateCarChildren[i]

      if (element.className.includes('name')) {
        carName = (element as HTMLInputElement).value
      }
      if (element.className.includes('color')) {
        carColor = (element as HTMLInputElement).value
      }
    }

    if (id && carName && carColor) {
      updateCar(+id, carName, carColor).then((status: number) => {
        this.getCars(status, 200, 'error with updating Car')
      })
    }
  }

  handleSelectCar(e: MouseEvent) {
    const target = e.target as HTMLElement
    const car: HTMLElement | null = target.closest('.car')

    if (car) {
      const id = car.getAttribute('id')
      const carName = car.getAttribute('carName')
      const color = car.getAttribute('color')

      if (id && carName && color) {
        const updateCarDOMLink = safeQuerySelector<HTMLElement>('.update-car')
        updateCarDOMLink.setAttribute('id', id)
        const updateCarChildren = updateCarDOMLink.children

        for (let i = 0; i < updateCarChildren.length; i += 1) {
          const element = updateCarChildren[i]
          element.removeAttribute('disabled')
          if (element.className.includes('name')) {
            ;(element as HTMLInputElement).value = carName
          }
          if (element.className.includes('color')) {
            ;(element as HTMLInputElement).value = color
          }
        }
      }
    }
  }

  handleRemoveCar(id: number) {
    Promise.allSettled([deleteCar(id), deleteWinner(id)]).then((result) => {
      if (result[0].status === 'fulfilled') {
        this.getCars(result[0].value, 200, 'error with deleting Car')
      }
    })
  }

  getCars(statusFromServer: number, neededStatus: number, errorMessage: string) {
    if (statusFromServer !== neededStatus) {
      console.log(errorMessage)
      return
    }
    Promise.all([getCars(), getWinners()]).then(([cars, winners]) => {
      this.model.state.cars = cars
      this.model.state.winners.items = winners.items
      this.model.state.winners.page = winners.page
      this.model.state.winners.count = winners.count

      this.model.notifyObservers(['Garage', 'Winners'])
    })
  }

  generateCars(carBrand: string[], carModel: string[]) {
    const carName = () => `${randomFromArray(carBrand)} ${randomFromArray(carModel)}`
    const RANDOM_CARS_COUNT = 100

    const carToAdd: Promise<Response>[] = Array(RANDOM_CARS_COUNT)
      .fill(1)
      .map(() => fetchGenerateCar(carName(), getRandomColor()))

    Promise.all(carToAdd)
      .then(() => {
        console.log('100 cars is generated')
        getCars().then((cars) => {
          this.model.state.cars = cars
          this.model.notifyObservers(['Garage'])
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleStartCar(
    carImage: HTMLElement,
    startButton: HTMLElement,
    stopButton: HTMLElement,
    carId: number
  ) {
    startButton.setAttribute('disabled', 'true')
    stopButton.removeAttribute('disabled')

    startStopEngine(carId, 'started').then(({ velocity, distance }) => {
      const animationTime = distance / velocity
      const flag = safeQuerySelector<HTMLElement>('.car__flag')
      const startPoint = carImage.getBoundingClientRect().left
      const finnishPoint = flag.getBoundingClientRect().right
      const trackDistance = finnishPoint - startPoint

      animation({
        carId,
        carImage,
        time: animationTime,
        totalDistance: trackDistance,
        driveCarCallback: driveEngine,
      })
    })
  }

  handleStopCar(
    carImage: HTMLElement,
    startButton: HTMLElement,
    stopButton: HTMLElement,
    carId: number
  ) {
    startStopEngine(carId, 'stopped').then(() => {
      carImage.style.transform = `translateX(0)`
      startButton.removeAttribute('disabled')
      stopButton.setAttribute('disabled', 'true')
    })
  }

  // handleRace(){}

  handleResetCars() {
    this.model.state.cars.items.forEach(({ id }) => {
      startStopEngine(id, 'stopped').then(() => {
        const carsImage = document.querySelectorAll<HTMLElement>('.car__image')
        carsImage.forEach((carImage) => {
          carImage.style.transform = `translateX(0)`
        })
        const startButtons = document.querySelectorAll<HTMLElement>('.car__start')
        startButtons.forEach((button) => {
          button.removeAttribute('disabled')
        })
        const stopButtons = document.querySelectorAll<HTMLElement>('.car__stop')
        stopButtons.forEach((button) => {
          button.setAttribute('disabled', 'true')
        })
      })
    })
  }
}
