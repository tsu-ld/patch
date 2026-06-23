import styles from './styles.module.css'

export default function IconToggle({ title, label, children }) {
  return (
    <button className={styles.iconToggle} title={title} aria-label={label}>
      {children}
    </button>
  )
}
