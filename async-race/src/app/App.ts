import Controller from './Controller'
import Model from './Model'
import View from './View'

export default class App {
  model: Model
  controller: Controller
  view: View

  constructor() {
    this.model = new Model()
    this.controller = new Controller(this.model)
    this.view = new View(this.controller)
  }

  init() {
    this.view.init()
  }
}
