import styles from './styles.module.css'

const MSG = 'no accounts ◇ no backend ◇ no uploads ◇ the link is the preset ↺ build → break → share ↺'

export default function Marquee() {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        <span>
          {MSG}
          {' '}
&nbsp;
        </span>
        <span>
          {MSG}
          {' '}
&nbsp;
        </span>
      </div>
    </div>
  )
}
