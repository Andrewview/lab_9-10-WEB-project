/**
 * BookingContext.jsx
 * Глобальний стан через useContext — зберігає обраний потяг, вагон, місця.
 * Принцип Single Source of Truth.
 */

import { createContext, useContext, useState, useEffect } from 'react'

const BookingContext = createContext(null)

const STORAGE_KEY = 'railway-bookings'

export function BookingProvider({ children }) {
  // Обраний потяг (об'єкт)
  const [selectedTrain, setSelectedTrain] = useState(null)

  // Обраний вагон (об'єкт)
  const [selectedWagon, setSelectedWagon] = useState(null)

  // Масив номерів обраних місць [1, 5, 12]
  const [selectedSeats, setSelectedSeats] = useState([])

  // Всі збережені бронювання (з localStorage)
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  // Збереження бронювань у localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  }, [bookings])

  // Перемикання місця (вибрати / скасувати)
  const toggleSeat = (seatNumber) => {
    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    )
  }

  // Отримати зайняті місця для конкретного вагону конкретного потяга
  const getBookedSeats = (trainId, wagonId) => {
    return bookings
      .filter(b => b.trainId === trainId && b.wagonId === wagonId)
      .flatMap(b => b.seats)
  }

  // Додати бронювання
  const addBooking = (bookingData) => {
    const booking = {
      id:        Date.now(),
      trainId:   selectedTrain.id,
      wagonId:   selectedWagon.id,
      wagonNum:  selectedWagon.number,
      seats:     selectedSeats,
      price:     selectedSeats.length * selectedWagon.price,
      createdAt: new Date().toISOString(),
      ...bookingData,
    }
    setBookings(prev => [booking, ...prev])
    return booking
  }

  // Скинути вибір місць (при зміні вагону)
  const resetSeats = () => setSelectedSeats([])

  // Скинути все (після бронювання)
  const resetAll = () => {
    setSelectedTrain(null)
    setSelectedWagon(null)
    setSelectedSeats([])
  }

  return (
    <BookingContext.Provider value={{
      selectedTrain, setSelectedTrain,
      selectedWagon, setSelectedWagon,
      selectedSeats, toggleSeat, resetSeats,
      bookings, addBooking, getBookedSeats,
      resetAll,
    }}>
      {children}
    </BookingContext.Provider>
  )
}

// Хук для зручного використання контексту
export const useBooking = () => {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be inside BookingProvider')
  return ctx
}