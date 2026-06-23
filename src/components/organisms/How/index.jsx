import styles from './styles.module.css'

export default function How({ children }) {
  return (
    <section className={styles.how}>
      {children}
    </section>
  )
}
