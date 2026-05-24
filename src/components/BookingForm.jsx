/**
 * BookingForm.jsx
 * Форма бронювання з валідацією полів.
 * Ім'я, телефон, email — всі поля обов'язкові.
 */

import { useState } from 'react'
import { useBooking } from '../context/BookingContext.jsx'
import { saveBooking } from '../services/BookingService.js'
import styles from './BookingForm.module.css'

// Валідаційні правила
const validate = (fields) => {
  const errors = {}

  if (!fields.name.trim()) {
    errors.name = "Введіть ваше ім'я"
  } else if (fields.name.trim().length < 2) {
    errors.name = "Ім'я надто коротке"
  }

  if (!fields.phone.trim()) {
    errors.phone = 'Введіть номер телефону'
  } else if (!/^\+?[\d\s\-()]{10,15}$/.test(fields.phone)) {
    errors.phone = 'Невірний формат телефону'
  }

  if (!fields.email.trim()) {
    errors.email = 'Введіть email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Невірний формат email'
  }

  return errors
}

export default function BookingForm({ onSuccess }) {
  const { selectedTrain, selectedWagon, selectedSeats, addBooking } = useBooking()

  // Стан полів форми
  const [fields, setFields] = useState({ name: '', phone: '', email: '' })

  // Стан помилок валідації
  const [errors, setErrors] = useState({})

  // Стан завантаження (під час збереження)
  const [loading, setLoading] = useState(false)

  // Чи показувати помилки (тільки після першої спроби відправки)
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = selectedSeats.length > 0

  // Оновлення поля
  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    // Знімаємо помилку при введенні
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Відправка форми
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)

    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    if (!canSubmit) return

    setLoading(true)
    try {
      const booking = addBooking({
        passengerName:  fields.name.trim(),
        passengerPhone: fields.phone.trim(),
        passengerEmail: fields.email.trim(),
      })
      await saveBooking(booking) // mock API-запит
      onSuccess(booking)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = selectedSeats.length * (selectedWagon?.price || 0)

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3 className={styles.title}>Дані пасажира</h3>

      {/* Ім'я */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Ім'я та прізвище <span className={styles.req}>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`${styles.input} ${submitted && errors.name ? styles.inputError : ''}`}
          value={fields.name}
          onChange={handleChange}
          placeholder="Іван Петренко"
          autoComplete="name"
        />
        {submitted && errors.name && (
          <span className={styles.error}>{errors.name}</span>
        )}
      </div>

      {/* Телефон */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="phone">
          Телефон <span className={styles.req}>*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={`${styles.input} ${submitted && errors.phone ? styles.inputError : ''}`}
          value={fields.phone}
          onChange={handleChange}
          placeholder="+38 050 123 45 67"
          autoComplete="tel"
        />
        {submitted && errors.phone && (
          <span className={styles.error}>{errors.phone}</span>
        )}
      </div>

      {/* Email */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email <span className={styles.req}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`${styles.input} ${submitted && errors.email ? styles.inputError : ''}`}
          value={fields.email}
          onChange={handleChange}
          placeholder="ivan@example.com"
          autoComplete="email"
        />
        {submitted && errors.email && (
          <span className={styles.error}>{errors.email}</span>
        )}
      </div>

      {/* Підсумок */}
      {selectedSeats.length > 0 && (
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Місця</span>
            <span>{selectedSeats.sort((a,b)=>a-b).join(', ')}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Кількість</span>
            <span>{selectedSeats.length} шт.</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Ціна за місце</span>
            <span>{selectedWagon?.price.toLocaleString('uk-UA')} ₴</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
            <span>Разом</span>
            <strong>{totalPrice.toLocaleString('uk-UA')} ₴</strong>
          </div>
        </div>
      )}

      {/* Попередження якщо місця не обрані */}
      {!canSubmit && (
        <p className={styles.warning}>⚠️ Оберіть хоча б одне місце на схемі</p>
      )}

      {/* Кнопка */}
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={loading || !canSubmit}
      >
        {loading ? (
          <>
            <span className={styles.btnSpinner} />
            Бронюємо...
          </>
        ) : (
          <>🎫 Забронювати квиток</>
        )}
      </button>
    </form>
  )
}