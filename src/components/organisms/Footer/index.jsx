import styles from './styles.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        {'Made with '}
        <span className={styles.heart}>♥</span>
        {' by '}
        <a href="https://github.com/tsu-ld" target="_blank" rel="noopener noreferrer">tsu</a>
      </p>
      <p>
        Not affiliated with Arturia or any third-party hardware manufacturer.
        All product names and trademarks belong to their respective owners.
      </p>
    </footer>
  )
}
