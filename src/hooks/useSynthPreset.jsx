import { useEffect, useState } from 'react'
import useUndoHistory from '@/hooks/useUndoHistory.jsx'
import { synths } from '@/synths/index.js'

function encode(values) {
  return btoa(JSON.stringify(values))
}

function decode(str) {
  try {
    return JSON.parse(atob(str))
  }
  catch (_) {
    return null
  }
}

function buildDefaults(synth) {
  const defaults = {}
  const p = synth.params

  Object.keys(p).forEach((key) => {
    if (p[key].type === 'switch') {
      const idx = p[key].options.indexOf(p[key].default)
      defaults[key] = idx / (p[key].options.length - 1)
    }
    else {
      defaults[key] = p[key].default
    }
  })

  return defaults
}

function initValues(synth, params, setError) {
  const base = buildDefaults(synth)
  const presetStr = params.get('preset')
  if (!presetStr)
    return base
  const decoded = decode(presetStr)
  if (!decoded) {
    setError(true)

    return base
  }
  const { __cables, ...rest } = decoded

  return { ...base, ...rest }
}

function useSynthTheme(synthId) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    document.body.dataset.theme = synthId
    // eslint-disable-next-line react/set-state-in-effect
    setReady(false)
    import(`@/synths/${synthId}/theme.css`)
      .then(() => setReady(true))
      .catch(() => setReady(true))

    return () => {
      delete document.body.dataset.theme
    }
  }, [synthId])

  return ready
}

export default function useSynthPreset() {
  const params = new URLSearchParams(window.location.search)
  const synthId = params.get('synth') || 'microbrute'
  const synth = synths.find(s => s.id === synthId) || synths[0]
  const [name, setName] = useState(params.get('name') || '')
  const [hasDecodeError, setHasDecodeError] = useState(false)
  const themeReady = useSynthTheme(synth.id)
  const history = useUndoHistory(30)
  const clearHistory = history.clear

  useEffect(() => {
    clearHistory()
  }, [synth.id, clearHistory])

  const [values, setValues] = useState(() => initValues(synth, params, setHasDecodeError))

  const setValue = (key, val) => {
    history.push(values)
    setValues(prev => ({ ...prev, [key]: val }))
  }

  const undoPreset = () => {
    if (!history.hasUndo)
      return
    setValues(history.undo())
  }

  const setPresetName = (newName) => {
    setName(newName)
    const p = new URLSearchParams(window.location.search)
    if (newName)
      p.set('name', newName)
    else p.delete('name')
    window.history.replaceState({}, '', `${location.pathname}?${p}`)
  }

  const resetPreset = () => {
    setValues(buildDefaults(synth))
    clearHistory()
  }

  const shareUrl = () => {
    const nameParam = name ? `&name=${encodeURIComponent(name)}` : ''
    const url = `${location.origin}/editor?synth=${synth.id}${nameParam}&preset=${encode(values)}`
    window.history.pushState({}, '', url)
    navigator.clipboard.writeText(url)
  }

  return { synth, values, setValue, resetPreset, undoPreset, shareUrl, name, setPresetName, themeReady, hasDecodeError, hasUndo: history.hasUndo }
}
