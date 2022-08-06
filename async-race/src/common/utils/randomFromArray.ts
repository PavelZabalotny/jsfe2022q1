export default function randomFromArray(array: string[]) {
  return array[Math.floor(Math.random() * (array.length + 1))]
}
