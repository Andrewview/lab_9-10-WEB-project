/**
 * SeatMap.jsx
 * Інтерактивна схема місць вагону.
 * Статуси: free (зелений), booked (червоний), selected (синій)
 */

import { useMemo } from 'react'
import { useBooking } from '../context/BookingContext.jsx'
import { generateSeats } from '../data/trains.js'
import styles from './SeatMap.module.css'

export default function SeatMap() {
  const {
    selectedWagon,
    selectedTrain,
    selectedSeats,
    toggleSeat,
    getBookedSeats,
  } = useBooking()

  // Отримуємо зайняті місця з localStorage
  const bookedNums = useMemo(() => {
    if (!selectedTrain || !selectedWagon) return new Set()
    return new Set(getBookedSeats(selectedTrain.id, selectedWagon.id))
  }, [selectedTrain, selectedWagon, getBookedSeats])

  // Генеруємо масив місць
  const seats = useMemo(() => {
    if (!selectedWagon) return []
    return generateSeats(selectedWagon, bookedNums)
  }, [selectedWagon, bookedNums])

  if (!selectedWagon) return null

  // Визначаємо статус кожного місця
  const getSeatStatus = (seat) => {
    if (bookedNums.has(seat.number))     return 'booked'
    if (selectedSeats.includes(seat.number)) return 'selected'
    return 'free'
  }

  // Кількість колонок залежно від типу вагону
  const cols = selectedWagon.type === 'Люкс' ? 2 : 4

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Схема місць — Вагон {selectedWagon.number} ({selectedWagon.type})
        </h3>
        <div className={styles.legend}>
          <span className={`${styles.dot} ${styles.dotFree}`}/>    Вільне
          <span className={`${styles.dot} ${styles.dotSelected}`}/> Обране
          <span className={`${styles.dot} ${styles.dotBooked}`}/>  Заброньоване
        </div>
      </div>

      {/* Лічильник */}
      {selectedSeats.length > 0 && (
        <div className={styles.counter}>
          Обрано {selectedSeats.length} {selectedSeats.length === 1 ? 'місце' : 'місця'} ·{' '}
          <strong>{(selectedSeats.length * selectedWagon.price).toLocaleString('uk-UA')} ₴</strong>
        </div>
      )}

      {/* Схема */}
      <div className={styles.mapWrap}>
        {/* Голова вагону */}
        <div className={styles.wagonHead}>
          <span>🚆 Голова</span>
        </div>

        {/* Сітка місць */}
        <div
          className={styles.grid}
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {seats.map(seat => {
            const status = getSeatStatus(seat)
            const disabled = status === 'booked'

            return (
              <button
                key={seat.id}
                className={`${styles.seat} ${styles[status]}`}
                onClick={() => !disabled && toggleSeat(seat.number)}
                disabled={disabled}
                aria-label={`Місце ${seat.number}, ${status}`}
                title={`Місце ${seat.number}`}
              >
                <span className={styles.seatNum}>{seat.number}</span>
              </button>
            )
          })}
        </div>

        {/* Хвіст вагону */}
        <div className={styles.wagonTail}>
          <span>🚃 Хвіст</span>
        </div>
      </div>
    </div>
  )
}