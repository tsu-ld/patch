import Footer from '@/components/Footer'
import Link from '@/providers/router/link.jsx'
import { synths } from '@/synths/index.js'

const steps = [
  { n: '01', label: 'Pick a synth', detail: 'Choose an instrument below.' },
  { n: '02', label: 'Dial in your sound', detail: 'Turn knobs, flip switches, shape the tone.' },
  { n: '03', label: 'Share the link', detail: 'Copy the URL. Every preset is a shareable link.' },
]

function SynthCard({ synth }) {
  return (
    <Link key={synth.id} to={`/editor?synth=${synth.id}`} className="synth-card">
      <img src={synth.panel} alt={synth.name} className="synth-card-image" />
      <div className="synth-card-body">
        <h3 className="synth-card-name">{synth.name}</h3>
        {synth.description && (
          <p className="synth-card-desc">{synth.description}</p>
        )}
        <span className="synth-card-meta">
          {`${Object.keys(synth.params).length} parameters`}
        </span>
      </div>
    </Link>
  )
}

export default function Landing() {
  return (
    <main>
      <header className="landing-hero">
        <h1>SynthShare</h1>
        <p className="landing-tagline">Your patches, shareable as a link.</p>
      </header>

      <section className="how-it-works">
        {steps.map(step => (
          <div key={step.n} className="how-step">
            <span className="how-step-n">{step.n}</span>
            <strong className="how-step-label">{step.label}</strong>
            <p className="how-step-detail">{step.detail}</p>
          </div>
        ))}
      </section>

      <section className="synth-section">
        <h2 className="section-heading">Instruments</h2>
        <div className="synth-grid">
          {synths.map(synth => (
            <SynthCard key={synth.id} synth={synth} />
          ))}
          <div className="synth-card synth-card-soon">
            <div className="synth-card-soon-image" />
            <div className="synth-card-body">
              <h3 className="synth-card-name">More instruments soon</h3>
              <p className="synth-card-desc">More synth panels on the way.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
