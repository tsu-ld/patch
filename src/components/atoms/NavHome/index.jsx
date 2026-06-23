import Link from '@/providers/router/link.jsx'
import styles from './styles.module.css'

export default function NavHome({ to }) {
  return (
    <Link to={to} className={styles.navHome}>
      patch
    </Link>
  )
}
