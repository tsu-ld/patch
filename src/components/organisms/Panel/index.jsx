import PatchBay from '@/components/organisms/PatchBay'
import SynthControl from '@/components/SynthControl'
import styles from './styles.module.css'

export default function Panel({ synth, values, setValue }) {
  const entries = Object.entries(synth.params)
  const jackKeys = new Set(entries.filter(([, p]) => p.type === 'jack').map(([k]) => k))
  const controlEntries = entries.filter(([k]) => !jackKeys.has(k))

  return (
    <div className={styles.container}>
      <div className={styles.caption}>
        <span className={styles.name}>{synth.id}</span>
        <span className={styles.meta}>analog · monophonic</span>
      </div>
      <div className={styles.inner}>
        <img className={styles.image} src={synth.panel} alt={synth.name} />
        {controlEntries.map(([key, param]) => (
          <SynthControl
            key={key}
            paramKey={key}
            param={param}
            values={values}
            setValue={setValue}
          />
        ))}
        {synth.modMatrixColumns && (
          <PatchBay
            params={synth.params}
            values={values}
            setValue={setValue}
          />
        )}
      </div>
    </div>
  )
}
