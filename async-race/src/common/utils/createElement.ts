import { INewElement } from '../../types'

export default function createElement({ tagName, classes, attributes, text }: INewElement) {
  const element = document.createElement(tagName)

  if (classes) {
    if (typeof classes === 'string') {
      element.classList.add(classes)
    } else {
      element.classList.add(...classes)
    }
  }

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })
  }

  if (text) {
    element.innerText = text
  }

  return element
}
