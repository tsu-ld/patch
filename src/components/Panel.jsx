import PatchBay from '@/components/PatchBay'
import SynthControl from '@/components/SynthControl'
import './Panel.css'

export default function Panel({ synth, values, setValue }) {
  const entries = Object.entries(synth.params)
  const jackKeys = new Set(entries.filter(([, p]) => p.type === 'jack').map(([k]) => k))
  const controlEntries = entries.filter(([k]) => !jackKeys.has(k))

  return (
    <div className="panel-container" style={{ position: 'relative' }}>
      <img src={synth.panel} alt={synth.name} style={{ width: '100%', pointerEvents: 'none', userSelect: 'none', userDrag: 'none' }} />
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
  )
}
