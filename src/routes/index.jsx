import Footer from '@/components/Footer'
import Link from '@/providers/router/link.jsx'
import { synths } from '@/synths/index.js'

const steps = [
  { label: 'Pick a synth', detail: 'Browse instruments and find your starting point.' },
  { label: 'Dial in your sound', detail: 'Turn knobs, flip switches, shape the tone.' },
  { label: 'Share the link', detail: 'Every preset lives in the URL. Copy and share.' },
]

function SynthCard({ synth }) {
  return (
    <Link to={`/editor?synth=${synth.id}`} className="synth-card">
      <img src={synth.panel} alt={synth.name} className="synth-card-image" />
      <div className="synth-card-body">
        <h3 className="synth-card-name">{synth.name}</h3>
        {synth.description && (
          <p className="synth-card-desc">{synth.description}</p>
        )}
        <span className="synth-card-meta">
          {`${Object.keys(synth.params).length} controls`}
        </span>
      </div>
    </Link>
  )
}

export default function Landing() {
  return (
    <main>
      <header className="landing-hero">
        <h1>patch</h1>
        <p className="landing-tagline">Create and share synthesizer presets. No accounts, no uploads. Every preset is a link.</p>
      </header>

      <section className="synth-section">
        <div className="synth-grid">
          {synths.map(synth => (
            <SynthCard key={synth.id} synth={synth} />
          ))}
        </div>
      </section>

      <section className="how-it-works">
        {steps.map((step, i) => (
          <div key={step.label} className="how-step">
            <span className="how-step-n">{String(i + 1).padStart(2, '0')}</span>
            <strong className="how-step-label">{step.label}</strong>
            <p className="how-step-detail">{step.detail}</p>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  )
}
