import styles from './styles.module.css'

export default function MiniKnob({ deg, isSwitch }) {
  if (isSwitch) {
    return (
      <div className={`${styles.mk} ${styles.switch}`}>
        <span className={styles.nub} />
      </div>
    )
  }

  return (
    <div className={styles.mk}>
      <span className={styles.dot} style={{ transform: `translateX(-50%) rotate(${deg}deg)` }} />
    </div>
  )
}
