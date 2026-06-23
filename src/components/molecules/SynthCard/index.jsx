import Tag from '@/components/atoms/Tag'
import Link from '@/providers/router/link.jsx'
import styles from './styles.module.css'

export default function SynthCard({ synth, soon }) {
  if (soon) {
    return (
      <div className={`${styles.card} ${styles.soon}`}>
        <div className={styles.soonThumb}>
          <span className={styles.soonMark}>◆</span>
        </div>
        <div className={styles.body}>
          <div className={styles.row}>
            <span className={styles.name}>more soon</span>
            <Tag>wip</Tag>
          </div>
          <span className={styles.desc}>More panels on the rack — drum machines, polysynths, eurorack. The format takes any front panel.</span>
          <span className={styles.meta}>on the bench</span>
        </div>
      </div>
    )
  }

  return (
    <Link to={`/editor?synth=${synth.id}`} className={styles.card}>
      <div className={styles.thumb}>
        <img src={synth.panel} alt={synth.name} />
        <span className={styles.open}>open →</span>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.name}>{synth.name}</span>
          <Tag>analog</Tag>
        </div>
        {synth.description && <span className={styles.desc}>{synth.description}</span>}
        <span className={styles.meta}>{`${Object.keys(synth.params).length} controls`}</span>
      </div>
    </Link>
  )
}
