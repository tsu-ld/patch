import styles from './styles.module.css'

export default function HowStep({ s, first }) {
  return (
    <div className={`${styles.step}${first ? '' : ` ${styles.bordered}`}`}>
      <span className={styles.n}>{s.n}</span>
      <span className={styles.l}>{s.l}</span>
      <span className={styles.d}>{s.d}</span>
    </div>
  )
}
