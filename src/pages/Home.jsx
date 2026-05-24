/**
 * Home.jsx — Сторінка списку рейсів (ЛР9)
 * Пошук за маршрутом і номером потяга, відображення карток
 */

import { useState, useEffect, useMemo } from 'react'
import { fetchTrains } from '../services/BookingService.js'
import TrainList from '../components/TrainList.jsx'
import styles from './Home.module.css'

export default function Home() {
  const [trains,  setTrains]  = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [sortBy,  setSortBy]  = useState('departure')

  // Завантаження потягів при монтуванні компонента
  useEffect(() => {
    fetchTrains()
      .then(data => setTrains(data))
      .finally(() => setLoading(false))
  }, [])

  // Фільтрація + сортування через useMemo (не рераховується без потреби)
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()

    let result = trains.filter(t => {
      if (!q) return true
      return (
        t.from.city.toLowerCase().includes(q) ||
        t.to.city.toLowerCase().includes(q)   ||
        t.number.toLowerCase().includes(q)    ||
        t.type.toLowerCase().includes(q)
      )
    })

    // Сортування
    result = [...result].sort((a, b) => {
      if (sortBy === 'departure') return new Date(a.departure) - new Date(b.departure)
      if (sortBy === 'price')     return Math.min(...a.wagons.map(w=>w.price)) - Math.min(...b.wagons.map(w=>w.price))
      if (sortBy === 'duration')  return a.duration.localeCompare(b.duration)
      return 0
    })

    return result
  }, [trains, search, sortBy])

  return (
    <div className={styles.page}>
      {/* Герой-блок */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          🚄 Залізничні квитки
        </h1>
        <p className={styles.heroSub}>
          Пошук та бронювання квитків на поїзди України
        </p>

        {/* Пошук */}
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.search}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Місто, напрямок або номер потяга..."
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => setSearch('')}>✕</button>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {/* Тулбар */}
        <div className={styles.toolbar}>
          <p className={styles.count}>
            {loading ? 'Завантаження...' : `Знайдено ${filtered.length} рейсів`}
          </p>
          <div className={styles.sortWrap}>
            <label className={styles.sortLabel}>Сортувати:</label>
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="departure">За відправленням</option>
              <option value="price">За ціною</option>
              <option value="duration">За тривалістю</option>
            </select>
          </div>
        </div>

        {/* Список потягів */}
        <TrainList trains={filtered} loading={loading} />
      </div>
    </div>
  )
}