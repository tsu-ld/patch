import styles from './styles.module.css'

export default function Switch({ value, options, onChange, label }) {
  const idx = Math.round(value * (options.length - 1))
  const currentOption = options[idx]
  const nubPct = 22
  const pad = 16
  const range = 100 - nubPct - pad * 2
  const step = options.length > 1 ? idx / (options.length - 1) : 0
  const topPct = pad + step * range

  const cycle = () => {
    const nextIdx = (idx + 1) % options.length
    onChange(nextIdx / (options.length - 1))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      cycle()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${label}: ${currentOption}`}
      onClick={cycle}
      onKeyDown={handleKeyDown}
      className={styles.track}
    >
      <div className={styles.nub} style={{ top: `${topPct}%` }} />
    </div>
  )
}
