import HowStep from '@/components/molecules/HowStep'
import Bar from '@/components/organisms/Bar'
import Footer from '@/components/organisms/Footer'
import Hero from '@/components/organisms/Hero'
import How from '@/components/organisms/How'
import InstrumentRack from '@/components/organisms/InstrumentRack'
import styles from './styles.module.css'

const steps = [
  { n: '01', l: 'pick a synth', d: 'Choose an instrument from the rack below. The panel loads with a ready-to-tweak preset.' },
  { n: '02', l: 'dial it in', d: 'Turn knobs, flip switches, patch the CV jacks. Every move writes itself into the URL.' },
  { n: '03', l: 'share the link', d: 'Copy the URL and send it. No accounts, no uploads — the link carries the whole patch.' },
]

export default function Landing() {
  return (
    <div className={styles.landingWrap}>
      <Bar />
      <Hero />
      <How>
        {steps.map((s, i) => <HowStep key={s.n} s={s} first={i === 0} />)}
      </How>
      <InstrumentRack />
      <Footer />
    </div>
  )
}
