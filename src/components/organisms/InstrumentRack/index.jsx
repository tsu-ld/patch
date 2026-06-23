import SectionHead from '@/components/molecules/SectionHead'
import SynthCard from '@/components/molecules/SynthCard'
import { synths } from '@/synths/index.js'
import styles from './styles.module.css'

export default function InstrumentRack() {
  return (
    <>
      <SectionHead title="instruments" count="01 / 01 live" />
      <div className={styles.grid}>
        {synths.map(synth => <SynthCard key={synth.id} synth={synth} />)}
        <SynthCard soon />
      </div>
    </>
  )
}
