export default interface IState {
  currentPage: 'Garage' | 'Winners'
  mainDOMLink?: HTMLElement
  forGaragePage: {
    title: 'Garage'
  }
  forWinnersPage: {
    title: 'Winners'
  }
}
