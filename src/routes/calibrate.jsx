import { useEffect, useState, useCallback } from 'react'
import { synths } from '@/synths/index.js'
import ControlRenderer from '@/components/ControlRenderer'

function buildCoords(synth) {
  const c = {}
  Object.entries(synth.params).forEach(([k, p]) => c[k] = { x: p.x, y: p.y })
  return c
}
// This is a DEV only page, don't worry about the code here
export default function Calibrate() {
  const params = new URLSearchParams(window.location.search)
  const synthId = params.get('synth') || 'microbrute'
  const synth = synths.find(s => s.id === synthId) || synths[0]
  const [selected, setSelected] = useState(null)
  const [coords, setCoords] = useState(() => buildCoords(synth))
  const [step, setStep] = useState(0.1)
  const [sizes, setSizes] = useState({ knob: 38, switchW: 20, switchH: 36, sliderH: 119, jack: 14 })

  useEffect(() => {
    document.body.dataset.theme = synth.id
    import(`@/synths/${synth.id}/theme.css`)
  }, [synth.id])

  const moveSelected = useCallback((dx, dy) => {
    if (!selected) return
    setCoords(prev => ({ ...prev, [selected]: {
      x: Math.round((prev[selected].x + dx) * 10) / 10,
      y: Math.round((prev[selected].y + dy) * 10) / 10,
    }}))
  }, [selected])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') moveSelected(-step, 0)
      if (e.key === 'ArrowRight') moveSelected(step, 0)
      if (e.key === 'ArrowUp') moveSelected(0, -step)
      if (e.key === 'ArrowDown') moveSelected(0, step)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [moveSelected, step])

  const copyAll = () => {
    const result = {}
    Object.entries(coords).forEach(([key, c]) => {
      const p = synth.params[key]
      result[key] = { ...p, x: c.x, y: c.y }
    })
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
  }

  const copySelected = () => {
    if (!selected) return
    const p = synth.params[selected]
    navigator.clipboard.writeText(JSON.stringify(
      { ...p, x: coords[selected].x, y: coords[selected].y }, null, 2
    ))
  }

  const sizeInput = (label, key) => (
    <label style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 'var(--text-xs)' }}>
      {label}
      <input type="text" value={sizes[key]}
        onChange={e => setSizes(prev => ({ ...prev, [key]: Number(e.target.value) || 0 }))}
        style={{ width: 44, padding: '2px 4px', fontSize: 'var(--text-xs)' }} />
    </label>
  )

  return (
    <>
      <nav>
        <h2>Calibrate: {synth.name}</h2>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <label style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 'var(--text-xs)' }}>
            Step %
            <input type="text" value={step} onChange={e => setStep(Number(e.target.value) || 0.1)}
              style={{ width: 50, padding: '2px 4px', fontSize: 'var(--text-xs)' }} />
          </label>
          {sizeInput('Knob', 'knob')}
          {sizeInput('Sw W', 'switchW')}
          {sizeInput('Sw H', 'switchH')}
          {sizeInput('Fader', 'sliderH')}
          {sizeInput('Jack', 'jack')}
          <button onClick={copyAll}>Export All</button>
        </div>
      </nav>
      <main style={{
        padding: 'var(--space-6)',
        '--knob-size': `${sizes.knob}px`,
        '--switch-w': `${sizes.switchW}px`,
        '--switch-h': `${sizes.switchH}px`,
        '--slider-h': `${sizes.sliderH}px`,
        '--jack-size': `${sizes.jack}px`,
      }}>
        <div style={{ position: 'relative' }}>
          <img src={synth.panel} alt={synth.name} style={{ width: '100%' }} />
          {Object.entries(synth.params).map(([key, param]) => {
            const c = coords[key]
            return (
              <div
                key={key}
                onClick={() => setSelected(key)}
                style={{
                  position: 'absolute',
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: selected === key ? 5 : 1,
                  outline: selected === key
                    ? '2px solid var(--color-accent)'
                    : '2px solid transparent',
                  outlineOffset: 4,
                }}
              >
                {param.type === 'jack' ? (
                  <div
                    style={{
                      width: 'var(--jack-size)',
                      height: 'var(--jack-size)',
                      borderRadius: '50%',
                      border: '1.5px solid var(--color-border)',
                      background: 'var(--color-surface)',
                    }}
                  />
                ) : (
                  <ControlRenderer
                    param={param}
                    value={0}
                    onChange={() => {}}
                  />
                )}
              </div>
            )
          })}
        </div>
        <aside style={{
          position: 'fixed',
          right: 'var(--space-4)',
          top: 'var(--space-16)',
          width: 220,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3)',
          maxHeight: 'calc(100vh - var(--space-24))',
          overflow: 'auto',
          zIndex: 20,
        }}>
          {selected ? (
            <>
              <h4 style={{ marginBottom: 'var(--space-1)' }}>{synth.params[selected].label}</h4>
              <code style={{ fontSize: 'var(--text-xs)' }}>{selected}</code>
              <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
                <label>
                  X
                  <input type="text" value={coords[selected].x}
                    onChange={e => setCoords(prev => ({ ...prev, [selected]: { ...prev[selected], x: Number(e.target.value) || 0 }}))} />
                </label>
                <label>
                  Y
                  <input type="text" value={coords[selected].y}
                    onChange={e => setCoords(prev => ({ ...prev, [selected]: { ...prev[selected], y: Number(e.target.value) || 0 }}))} />
                </label>
              </div>
              <button onClick={copySelected} style={{ marginTop: 'var(--space-2)', width: '100%' }}>
                Copy selected
              </button>
            </>
          ) : (
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Click a control to select it. Arrow keys to move.</p>
          )}
        </aside>
      </main>
    </>
  )
}
