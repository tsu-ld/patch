import styles from './styles.module.css'

export default function Tooltip({ text, children }) {
  return (
    <div className={styles.wrapper}>
      {children}
      <span className={styles.text}>{text}</span>
    </div>
  )
}
