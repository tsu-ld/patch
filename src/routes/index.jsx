import Footer from '@/components/Footer'
import Link from '@/providers/router/link.jsx'
import { synths } from '@/synths/index.js'

const steps = [
  { n: '01', l: 'pick a synth', d: 'Choose an instrument from the rack below. The panel loads with a ready-to-tweak preset.' },
  { n: '02', l: 'dial it in', d: 'Turn knobs, flip switches, patch the CV jacks. Every move writes itself into the URL.' },
  { n: '03', l: 'share the link', d: 'Copy the URL and send it. No accounts, no uploads — the link carries the whole patch.' },
]

const mkDots = [-72, 135, 18, -40, 95]

function MiniKnob({ deg }) {
  return (
    <div className="mk">
      <span className="mk-dot" style={{ transform: `translateX(-50%) rotate(${deg}deg)` }} />
    </div>
  )
}

function DemoCard() {
  return (
    <aside className="demo" aria-hidden="true">
      <div className="demo-head">
        <span>the url is the preset</span>
        <span className="demo-live">◆ live</span>
      </div>
      <div className="demo-url">
        <span className="u-base">patch.app/#/editor?</span>
        <span className="u-k">k=500.0.1000.0.620…</span>
        <span className="u-j">&amp;j=lfo▸cutoff</span>
      </div>
      <div className="demo-strip">
        <div className="mk-row">
          {mkDots.map(deg => <MiniKnob key={deg} deg={deg} />)}
          <div className="mk mk-sw">
            <span className="mk-nub" />
          </div>
        </div>
      </div>
      <div className="demo-foot">every knob, switch &amp; cable encoded into the link — copy it, paste it, the sound rebuilds.</div>
    </aside>
  )
}

function HowStep({ s, first }) {
  return (
    <div className={`how-step${first ? '' : ' how-step--bordered'}`}>
      <span className="how-n">{s.n}</span>
      <span className="how-l">{s.l}</span>
      <span className="how-d">{s.d}</span>
    </div>
  )
}

function SynthCard({ synth }) {
  return (
    <Link to={`/editor?synth=${synth.id}`} className="synth-card">
      <div className="synth-thumb">
        <img src={synth.panel} alt={synth.name} />
        <span className="card-open">open →</span>
      </div>
      <div className="synth-body">
        <div className="synth-row">
          <span className="synth-name">{synth.name}</span>
          <span className="synth-tag">analog</span>
        </div>
        {synth.description && <span className="synth-desc">{synth.description}</span>}
        <span className="synth-meta">{`${Object.keys(synth.params).length} controls`}</span>
      </div>
    </Link>
  )
}

function SoonCard() {
  return (
    <div className="synth-card soon">
      <div className="soon-thumb">
        <span className="soon-mark">◆</span>
      </div>
      <div className="synth-body">
        <div className="synth-row">
          <span className="synth-name">more soon</span>
          <span className="synth-tag">wip</span>
        </div>
        <span className="synth-desc">More panels on the rack — drum machines, polysynths, eurorack. The format takes any front panel.</span>
        <span className="synth-meta">on the bench</span>
      </div>
    </div>
  )
}

function LandingNav() {
  return (
    <nav className="bar">
      <div className="nav-left">
        <span className="nav-home">patch</span>
      </div>
      <div className="nav-spacer" />
      <div className="nav-tools">
        <button className="icon-toggle" title="cycle accent" aria-label="cycle accent">◆</button>
        <button className="icon-toggle" title="toggle theme" aria-label="toggle theme">☾</button>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <header className="hero">
      <div className="hero-left">
        <h1 className="hero-name">patch</h1>
        <p className="hero-tag">your patches, shareable as a link.</p>
      </div>
      <DemoCard />
    </header>
  )
}

function MarqueeBand() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>no accounts ◇ no backend ◇ no uploads ◇ the link is the preset ↺ build → break → share ↺ &nbsp;</span>
        <span>no accounts ◇ no backend ◇ no uploads ◇ the link is the preset ↺ build → break → share ↺ &nbsp;</span>
      </div>
    </div>
  )
}

function InstrumentRack() {
  return (
    <>
      <div className="sect-head">
        <h2 className="sect-h">instruments</h2>
        <span className="sect-count">01 / 01 live</span>
      </div>
      <div className="synth-grid">
        {synths.map(synth => <SynthCard key={synth.id} synth={synth} />)}
        <SoonCard />
      </div>
    </>
  )
}

export default function Landing() {
  return (
    <div className="landing-wrap">
      <LandingNav />
      <HeroSection />
      <section className="how">
        {steps.map((s, i) => <HowStep key={s.n} s={s} first={i === 0} />)}
      </section>
      <InstrumentRack />
      <Footer />
    </div>
  )
}
