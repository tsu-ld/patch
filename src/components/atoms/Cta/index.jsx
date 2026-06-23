import Link from '@/providers/router/link.jsx'
import styles from './styles.module.css'

export default function Cta({ to, children }) {
  return (
    <Link to={to} className={styles.cta}>
      {children}
      <span className={styles.arr} aria-hidden="true">→</span>
    </Link>
  )
}
