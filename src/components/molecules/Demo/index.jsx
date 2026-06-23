import MiniKnob from '@/components/atoms/MiniKnob'
import styles from './styles.module.css'

const mkDots = [-72, 135, 18, -40, 95]

export default function Demo() {
  return (
    <aside className={styles.demo} aria-hidden="true">
      <div className={styles.head}>
        <span>the url is the preset</span>
        <span className={styles.live}>◆ live</span>
      </div>
      <div className={styles.url}>
        <span className={styles.base}>patch.app/#/editor?</span>
        <span className={styles.k}>k=500.0.1000.0.620…</span>
        <span className={styles.j}>&amp;j=lfo▸cutoff</span>
      </div>
      <div className={styles.strip}>
        <div className={styles.row}>
          {mkDots.map(deg => <MiniKnob key={deg} deg={deg} />)}
          <MiniKnob isSwitch />
        </div>
      </div>
      <div className={styles.foot}>every knob, switch &amp; cable encoded into the link — copy it, paste it, the sound rebuilds.</div>
    </aside>
  )
}
