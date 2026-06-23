import styles from './styles.module.css'

export default function Kicker({ children }) {
  return <p className={styles.kicker}>{children}</p>
}
