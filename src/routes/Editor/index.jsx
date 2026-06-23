import PresetName from '@/components/molecules/PresetName'
import ShareButton from '@/components/molecules/ShareButton'
import Bar from '@/components/organisms/Bar'
import barStyles from '@/components/organisms/Bar/styles.module.css'
import Footer from '@/components/organisms/Footer'
import Panel from '@/components/organisms/Panel'
import ParamSidebar from '@/components/organisms/ParamSidebar'
import useSynthPreset from '@/hooks/useSynthPreset'
import Link from '@/providers/router/link.jsx'
import styles from './styles.module.css'

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
      <Bar>
        <div className={barStyles.barLeft}>
          <Link to="/" className={barStyles.barHome}>patch</Link>
          <span className={barStyles.barSep} aria-hidden="true" />
          <span className={barStyles.barSynth}>{synth.name}</span>
        </div>
        <div className={barStyles.barSpacer} />
        <PresetName name={name} onChange={setPresetName} />
        <div className={barStyles.barTools}>
          <button onClick={undoPreset} disabled={!hasUndo}>Undo</button>
          <button onClick={handleReset}>Reset</button>
          <ShareButton shareUrl={shareUrl} />
        </div>
      </Bar>
      {hasDecodeError && (
        <div className={styles.decodeError}>
          Couldn't read this preset, starting from defaults.
        </div>
      )}
      <div className={`${styles.editorLayout}${themeReady ? '' : ` ${styles.themeLoading}`}`}>
        <Panel synth={synth} values={values} setValue={setValue} />
        <ParamSidebar synth={synth} values={values} />
      </div>
      <Footer />
    </>
  )
}
