export default function animation({
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
  let success = true
  const start = performance.now()
  driveCarCallback(carId).then((engineStatus) => {
    success = engineStatus
    console.log(`carId - ${carId} - status - ${engineStatus}`)
  })
  requestAnimationFrame(function animate(timestamp) {
    const timeFraction = (timestamp - start) / time
    const distanceCovered = totalDistance * timeFraction
    carImage.style.transform = `translateX(${Math.min(distanceCovered, totalDistance)}px)`
    if (timeFraction < 1 && success) {
      requestAnimationFrame(animate)
    }
  })
}
