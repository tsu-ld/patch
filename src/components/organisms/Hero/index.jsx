import Demo from '@/components/molecules/Demo'
import styles from './styles.module.css'

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.name}>patch</h1>
        <p className={styles.tag}>your patches, shareable as a link.</p>
      </div>
      <Demo />
    </header>
  )
}
