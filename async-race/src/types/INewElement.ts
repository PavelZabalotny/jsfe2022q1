export default interface INewElement {
  tagName: string
  classes?: string | string[]
  attributes?: { [key: string]: string }
  text?: string
}
