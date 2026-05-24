/**
 * Booking.jsx — Сторінка бронювання (ЛР10)
 * Вибір вагону, схема місць, форма бронювання
 */

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBooking }    from '../context/BookingContext.jsx'
import { fetchTrainById } from '../services/BookingService.js'
import WagonSelector from '../components/WagonSelector.jsx'
import SeatMap       from '../components/SeatMap.jsx'
import BookingForm   from '../components/BookingForm.jsx'
import styles from './Booking.module.css'

// Форматування часу
const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })

export default function Booking() {
  const { trainId } = useParams()
  const navigate    = useNavigate()
  const { selectedTrain, setSelectedTrain, selectedWagon, selectedSeats, resetAll } = useBooking()

  const [loading, setLoading] = useState(!selectedTrain)
  const [error,   setError]   = useState(null)

  // Якщо потяг не збережений у контексті — завантажуємо за id з URL
  useEffect(() => {
    if (selectedTrain?.id === trainId) { setLoading(false); return }
    setLoading(true)
    fetchTrainById(trainId)
      .then(t => { setSelectedTrain(t); setLoading(false) })
      .catch(() => { setError('Рейс не знайдено'); setLoading(false) })
  }, [trainId])

  // Успішне бронювання — показуємо success-екран
  const [success, setSuccess] = useState(null)

  const handleSuccess = (booking) => {
    setSuccess(booking)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className={styles.center}>
        <div className={styles.spinner} />
        <p style={{ color: 'var(--text-3)' }}>Завантаження рейсу...</p>
      </div>
    )
  }

  // ── Error ────────────────────────────────────────────────
  if (error || !selectedTrain) {
    return (
      <div className={styles.center}>
        <span style={{ fontSize: 40 }}>🚫</span>
        <p style={{ color: 'var(--text-2)', fontWeight: 600 }}>{error || 'Рейс не знайдено'}</p>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← На головну</button>
      </div>
    )
  }

  const t = selectedTrain

  // ── Success ──────────────────────────────────────────────
  if (success) {
    return (
      <div className={styles.successWrap}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <h2 className={styles.successTitle}>Бронювання підтверджено!</h2>
          <p className={styles.successSub}>Квиток надіслано на {success.passengerEmail}</p>

          <div className={styles.ticketInfo}>
            <div className={styles.ticketRow}>
              <span>Пасажир</span>
              <strong>{success.passengerName}</strong>
            </div>
            <div className={styles.ticketRow}>
              <span>Маршрут</span>
              <strong>{t.from.city} → {t.to.city}</strong>
            </div>
            <div className={styles.ticketRow}>
              <span>Потяг</span>
              <strong>№ {t.number}</strong>
            </div>
            <div className={styles.ticketRow}>
              <span>Вагон</span>
              <strong>{success.wagonNum}</strong>
            </div>
            <div className={styles.ticketRow}>
              <span>Місця</span>
              <strong>{success.seats.sort((a,b)=>a-b).join(', ')}</strong>
            </div>
            <div className={styles.ticketRow}>
              <span>Сума</span>
              <strong style={{ color: 'var(--green)' }}>
                {success.price.toLocaleString('uk-UA')} ₴
              </strong>
            </div>
          </div>

          <div className={styles.successActions}>
            <button
              className={styles.primaryBtn}
              onClick={() => { resetAll(); navigate('/') }}
            >
              🚄 Знайти ще рейс
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Main ─────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      {/* Інфо про рейс */}
      <div className={styles.trainBanner}>
        <div className={styles.bannerInner}>
          <div className={styles.bannerLeft}>
            <span className={styles.trainNum}>№ {t.number} · {t.type}</span>
            <div className={styles.bannerRoute}>
              <span>{t.from.city}</span>
              <span className={styles.bannerArrow}>→</span>
              <span>{t.to.city}</span>
            </div>
          </div>
          <div className={styles.bannerRight}>
            <span className={styles.bannerTime}>
              {fmtTime(t.departure)} — {fmtTime(t.arrival)}
            </span>
            <span className={styles.bannerDate}>{fmtDate(t.departure)} · {t.duration}</span>
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className={styles.content}>
        <div className={styles.left}>
          {/* Вибір вагону */}
          <WagonSelector wagons={t.wagons} />

          {/* Схема місць */}
          {selectedWagon && <SeatMap />}

          {/* Підказка */}
          {!selectedWagon && (
            <div className={styles.hint}>
              👆 Оберіть вагон вище, щоб побачити схему місць
            </div>
          )}
        </div>

        <div className={styles.right}>
          <BookingForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  )
}