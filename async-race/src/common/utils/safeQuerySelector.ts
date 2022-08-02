/**
 * Safely get a DOM element by selector
 * @param selector css selector like '.class'
 * @param parent (default - document) - DOM element
 * @return {element} DOM element like HTMLElement
 */

export default function safeQuerySelector<T extends Element>(
  selector: string,
  parent: Pick<Element, 'querySelector'> = document
): T {
  const element = parent.querySelector(selector)
  if (!element) {
    throw new Error(`Selector '${selector}' didn't match any elements.`)
  }
  return <T>element
}
