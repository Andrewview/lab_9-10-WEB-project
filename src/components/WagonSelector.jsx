/**
 * WagonSelector.jsx
 * Вибір вагону для бронювання
 */

import { useBooking } from '../context/BookingContext.jsx'
import styles from './WagonSelector.module.css'

const typeIcon = (type) => {
  if (type === 'Люкс')     return '👑'
  if (type === 'Купе')     return '🚪'
  if (type === 'Плацкарт') return '🛏️'
  return '🚃'
}

export default function WagonSelector({ wagons }) {
  const { selectedWagon, setSelectedWagon, resetSeats, getBookedSeats, selectedTrain } = useBooking()

  const handleSelect = (wagon) => {
    if (selectedWagon?.id === wagon.id) return
    setSelectedWagon(wagon)
    resetSeats() // скидаємо обрані місця при зміні вагону
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Оберіть вагон</h3>
      <div className={styles.wagons}>
        {wagons.map(wagon => {
          const booked = selectedTrain
            ? getBookedSeats(selectedTrain.id, wagon.id).length
            : 0
          const free = wagon.seats - booked
          const isSelected = selectedWagon?.id === wagon.id

          return (
            <button
              key={wagon.id}
              className={`${styles.wagon} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleSelect(wagon)}
            >
              <span className={styles.wagonIcon}>{typeIcon(wagon.type)}</span>
              <div className={styles.wagonInfo}>
                <span className={styles.wagonNum}>Вагон {wagon.number}</span>
                <span className={styles.wagonType}>{wagon.type}</span>
                <span className={styles.wagonFree}>{free} вільних</span>
              </div>
              <div className={styles.wagonPrice}>
                <span className={styles.price}>{wagon.price.toLocaleString('uk-UA')}</span>
                <span className={styles.priceCur}>₴/місце</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}