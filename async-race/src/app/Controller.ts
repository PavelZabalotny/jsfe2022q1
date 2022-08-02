import Model from './Model'

export default class Controller {
  public model: Model

  constructor(model: Model) {
    this.model = model
  }

  headerButtonClickHandler(e: MouseEvent, title: 'Garage' | 'Winners') {
    e.stopPropagation()

    console.log('controller eventHandle:', title)
    this.model.state = { ...this.model.state, currentView: title }
    this.model.notifyObservers()
    console.log(
      '🚀 ~ file: Controller.ts ~ line 29 ~ Controller ~ headerButtonsClickHandler ~ this.model.state.currentPage: ',
      this.model.state.currentView
    )
  }
}
