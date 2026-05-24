import { Link, useLocation } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.jsx'
import styles from './Header.module.css'

export default function Header() {
  const { bookings } = useBooking()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Логотип */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🚄</span>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>УкрЗалізниця</span>
            <span className={styles.logoSub}>Система бронювання</span>
          </div>
        </Link>

        {/* Навігація */}
        <nav className={styles.nav}>
          {!isHome && (
            <Link to="/" className={styles.backBtn}>
              ← Всі рейси
            </Link>
          )}
          {bookings.length > 0 && (
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🎫</span>
              <span>{bookings.length} квитків</span>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}