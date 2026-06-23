import styles from './styles.module.css'

export default function SectionHead({ title, count }) {
  return (
    <div className={styles.sectHead}>
      <h2 className={styles.h}>{title}</h2>
      {count && <span className={styles.count}>{count}</span>}
    </div>
  )
}
