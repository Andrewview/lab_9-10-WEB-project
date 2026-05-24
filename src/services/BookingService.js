/**
 * BookingService.js
 * Сервісний шар для роботи з даними бронювань.
 * Імітує API-запити (mock), може бути замінений на реальний fetch.
 */

const DELAY = 300 // імітація затримки мережі

/** Затримка (імітація API) */
const delay = (ms) => new Promise(res => setTimeout(res, ms))

/** Отримати список потягів */
export const fetchTrains = async () => {
  await delay(DELAY)
  // Імпортуємо локальні дані (в реальному проекті — fetch до API)
  const { trains } = await import('../data/trains.js')
  return trains
}

/** Отримати потяг за id */
export const fetchTrainById = async (id) => {
  await delay(DELAY)
  const { trains } = await import('../data/trains.js')
  const train = trains.find(t => t.id === id)
  if (!train) throw new Error(`Потяг ${id} не знайдено`)
  return train
}

/** Зберегти бронювання (mock — зберігається в localStorage через контекст) */
export const saveBooking = async (booking) => {
  await delay(DELAY)
  return { success: true, bookingId: booking.id }
}