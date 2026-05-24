/**
 * TrainCard.jsx
 * Картка одного потяга — маршрут, час, ціна, кнопка бронювання.
 */

import { useNavigate } from 'react-router-dom'
import { useBooking }  from '../context/BookingContext.jsx'
import styles from './TrainCard.module.css'

// Форматування часу HH:MM
const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })

// Форматування дати
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', weekday: 'short' })

// Мінімальна ціна серед вагонів
const minPrice = (wagons) =>
  Math.min(...wagons.map(w => w.price)).toLocaleString('uk-UA')

// Тип потяга → колір бейджа
const typeColor = (type) => {
  if (type.includes('Інтерсіті')) return 'ic'
  if (type.includes('Регіональний')) return 're'
  return 'default'
}

export default function TrainCard({ train }) {
  const navigate = useNavigate()
  const { setSelectedTrain, resetAll } = useBooking()

  const handleBook = () => {
    resetAll()
    setSelectedTrain(train)
    navigate(`/booking/${train.id}`)
  }

  return (
    <article className={styles.card}>
      {/* Шапка картки */}
      <div className={styles.cardTop}>
        <div className={styles.trainInfo}>
          <span className={`${styles.typeBadge} ${styles[typeColor(train.type)]}`}>
            {train.type}
          </span>
          <span className={styles.trainNum}>№ {train.number}</span>
        </div>
        <span className={styles.date}>{fmtDate(train.departure)}</span>
      </div>

      {/* Маршрут */}
      <div className={styles.route}>
        {/* Відправлення */}
        <div className={styles.point}>
          <span className={styles.time}>{fmtTime(train.departure)}</span>
          <span className={styles.city}>{train.from.city}</span>
          <span className={styles.station}>{train.from.station}</span>
        </div>

        {/* Лінія */}
        <div className={styles.line}>
          <div className={styles.lineDot} />
          <div className={styles.lineTrack} />
          <span className={styles.duration}>{train.duration}</span>
          <div className={styles.lineTrack} />
          <div className={`${styles.lineDot} ${styles.lineDotEnd}`} />
        </div>

        {/* Прибуття */}
        <div className={`${styles.point} ${styles.pointRight}`}>
          <span className={styles.time}>{fmtTime(train.arrival)}</span>
          <span className={styles.city}>{train.to.city}</span>
          <span className={styles.station}>{train.to.station}</span>
        </div>
      </div>

      {/* Футер картки */}
      <div className={styles.cardBottom}>
        <div className={styles.wagonsInfo}>
          {train.wagons.map(w => (
            <span key={w.id} className={styles.wagonTag}>
              {w.type} · {w.price.toLocaleString('uk-UA')} ₴
            </span>
          ))}
        </div>

        <button className={styles.bookBtn} onClick={handleBook}>
          Обрати місця
          <span className={styles.bookBtnArrow}>→</span>
        </button>
      </div>

      {/* Мінімальна ціна */}
      <div className={styles.minPrice}>
        від <strong>{minPrice(train.wagons)} ₴</strong>
      </div>
    </article>
  )
}