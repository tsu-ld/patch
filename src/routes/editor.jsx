import Footer from '@/components/Footer'
import Panel from '@/components/Panel'
import ParamSidebar from '@/components/ParamSidebar'
import PresetName from '@/components/PresetName'
import ShareButton from '@/components/ShareButton'
import useSynthPreset from '@/hooks/useSynthPreset'
import Link from '@/providers/router/link.jsx'

export default function Editor() {
  const { synth, values, setValue, resetPreset, undoPreset, shareUrl, name, setPresetName, themeReady, hasDecodeError, hasUndo } = useSynthPreset()

  const handleReset = () => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Reset all parameters to default?'))
      return

    resetPreset()
  }

  return (
    <>
      <nav className="bar">
        <div className="nav-left">
          <Link to="/" className="nav-home">patch</Link>
          <span className="nav-sep" aria-hidden="true" />
          <span className="nav-synth">{synth.name}</span>
        </div>
        <div className="nav-spacer" />
        <PresetName name={name} onChange={setPresetName} />
        <div className="nav-tools">
          <button onClick={undoPreset} disabled={!hasUndo}>Undo</button>
          <button onClick={handleReset}>Reset</button>
          <ShareButton shareUrl={shareUrl} />
        </div>
      </nav>
      {hasDecodeError && (
        <div className="decode-error">
          Couldn't read this preset, starting from defaults.
        </div>
      )}
      <div className={`editor-layout${themeReady ? '' : ' theme-loading'}`}>
        <Panel synth={synth} values={values} setValue={setValue} />
        <ParamSidebar synth={synth} values={values} />
      </div>
      <Footer />
    </>
  )
}
