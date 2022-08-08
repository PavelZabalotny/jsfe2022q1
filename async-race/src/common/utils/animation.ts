export default async function animation({
  carId,
  carImage,
  time,
  totalDistance,
  driveCarCallback,
}: {
  carId: number
  carImage: HTMLElement
  time: number
  totalDistance: number
  driveCarCallback: (carId: number) => Promise<boolean>
}) {
  const start = performance.now()
  let drive: boolean | null = null

  requestAnimationFrame(function animate(timestamp) {
    const timeFraction = (timestamp - start) / time
    const distanceCovered = totalDistance * timeFraction
    carImage.style.transform = `translateX(${Math.min(distanceCovered, totalDistance)}px)`
    if (timeFraction < 1 && drive === null) {
      requestAnimationFrame(animate)
    }
  })

  const result: boolean = await driveCarCallback(carId).then((status) => {
    drive = status
    return status
  })

  if (!result) {
    return Promise.reject(
      new Error(`Car #${carId} has been stopped suddenly. It's engine was broken down.`)
    )
  }

  return Promise.resolve({ carId, time })
}
