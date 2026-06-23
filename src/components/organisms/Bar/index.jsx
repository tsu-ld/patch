import styles from './styles.module.css'

export default function Bar({ children }) {
  return <nav className={styles.bar}>{children}</nav>
}
