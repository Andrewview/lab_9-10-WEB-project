/**
 * TrainList.jsx
 * Рендерить список карток потягів через .map()
 */

import TrainCard from './TrainCard.jsx'
import styles from './TrainList.module.css'

export default function TrainList({ trains, loading }) {
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Завантаження рейсів...</p>
      </div>
    )
  }

  if (!trains.length) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🔍</span>
        <p className={styles.emptyTitle}>Рейсів не знайдено</p>
        <p className={styles.emptyText}>Спробуйте змінити параметри пошуку</p>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {/* .map() — рендеринг списку, key обов'язковий */}
      {trains.map((train, index) => (
        <div
          key={train.id}
          style={{ animationDelay: `${index * 0.06}s` }}
        >
          <TrainCard train={train} />
        </div>
      ))}
    </div>
  )
}