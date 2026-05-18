import { useCallback, useMemo, useRef, useState } from 'react'
import './PatchBay.css'

function cablePath(a, b) {
  const dx = Math.abs(b.x - a.x) * 0.45

  return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`
}

function svgCoords(e, container) {
  const rect = container.getBoundingClientRect()

  return {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100,
  }
}

function hitTestJack(clientX, clientY, el) {
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  return Math.hypot(clientX - cx, clientY - cy) < rect.width * 1.2
}

function cableKey(srcKey, dstKey) {
  return `${srcKey}-${dstKey}`
}

function CableLines({ cables }) {
  return cables.map(c => (
    <g key={cableKey(c[2], c[3])}>
      <path
        d={cablePath(c[0], c[1])}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <path
        d={cablePath(c[0], c[1])}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="0.3"
        strokeLinecap="round"
        opacity="0.3"
        style={{ filter: 'blur(3px)' }}
      />
    </g>
  ))
}

function PreviewCable({ from, preview }) {
  if (!from || !preview)
    return null

  return (
    <path
      d={cablePath(from, preview)}
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="0.4"
      strokeLinecap="round"
      strokeDasharray="1.5 1.5"
      opacity="0.6"
    />
  )
}

function jackClass(param, isConnected, isActive) {
  return [
    'jack',
    isConnected ? 'jack--connected' : '',
    isActive ? 'jack--active' : '',
  ].filter(Boolean).join(' ')
}

function buildCables(jackEntries, values) {
  const lookup = Object.fromEntries(jackEntries)
  const list = []

  jackEntries.forEach(([key, param]) => {
    if (param.direction !== 'out')
      return
    const conns = values[key]
    if (!conns || !Array.isArray(conns))
      return
    conns.forEach((targetKey) => {
      const target = lookup[targetKey]
      if (!target)
        return
      list.push([param, target, key, targetKey])
    })
  })

  return list
}

function usePatchData(jackEntries, values, setValue) {
  const cables = useMemo(() => buildCables(jackEntries, values), [jackEntries, values])
  const isDestConnected = useMemo(() => new Set(cables.map(c => c[3])), [cables])
  const jackById = useMemo(() => Object.fromEntries(jackEntries), [jackEntries])

  const addConnection = useCallback((srcKey, dstKey) => {
    const src = jackById[srcKey]
    const dst = jackById[dstKey]
    if (!src || !dst)
      return
    if (src.direction !== 'out' || dst.direction !== 'in')
      return
    if (isDestConnected.has(dstKey))
      return

    setValue(srcKey, [...(values[srcKey] || []), dstKey])
    setValue(dstKey, srcKey)
  }, [jackById, values, setValue, isDestConnected])

  const removeConnection = useCallback((srcKey, dstKey) => {
    const srcConns = values[srcKey]
    if (!Array.isArray(srcConns))
      return

    const nextSrc = srcConns.filter(k => k !== dstKey)
    if (nextSrc.length > 0) {
      setValue(srcKey, nextSrc)
    }
    else {
      setValue(srcKey, null)
    }
    setValue(dstKey, null)
  }, [values, setValue])

  const removeAll = useCallback((srcKey) => {
    const srcConns = values[srcKey]
    if (!Array.isArray(srcConns))
      return
    srcConns.forEach((dstKey) => {
      setValue(dstKey, null)
    })
    setValue(srcKey, null)
  }, [values, setValue])

  const jackIsConnected = useCallback((key, param) => {
    if (param.direction === 'in')
      return isDestConnected.has(key)

    return Array.isArray(values[key]) && values[key].length > 0
  }, [isDestConnected, values])

  return { cables, isDestConnected, addConnection, removeConnection, removeAll, jackIsConnected, jackById }
}

function usePatchDrag() {
  const containerRef = useRef(null)
  const [from, setFrom] = useState(null)
  const [preview, setPreview] = useState(null)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef(null)

  return { containerRef, from, setFrom, preview, setPreview, isDraggingRef, dragStartRef }
}

function jackDown(e, deps) {
  const el = e.target.closest('[data-jack]')
  if (!el)
    return
  const key = el.dataset.jack
  const param = deps.jackById[key]
  if (!param)
    return

  if (param.direction === 'in') {
    if (!deps.isDestConnected.has(key))
      return
    const srcKey = deps.cables.find(c => c[3] === key)?.[2]
    if (!srcKey)
      return
    deps.removeConnection(srcKey, key)

    return
  }

  if (Array.isArray(deps.values[key]) && deps.values[key].length > 0) {
    deps.removeAll(key)

    return
  }

  if (e.target.setPointerCapture)
    e.target.setPointerCapture(e.pointerId)

  deps.dragStartRef.current = { x: e.clientX, y: e.clientY }
  deps.isDraggingRef.current = false

  const coords = svgCoords(e, deps.containerRef.current)
  deps.setFrom({ key, x: param.x, y: param.y })
  deps.setPreview(coords)
}

function usePatchHandlers(deps) {
  const { from, jackById, cables, isDestConnected, values, addConnection, removeConnection, removeAll, setFrom, setPreview, isDraggingRef, dragStartRef, containerRef } = deps

  const findTarget = useCallback((clientX, clientY) => {
    for (const [key] of Object.entries(jackById)) {
      const el = document.querySelector(`[data-jack="${key}"]`)
      if (el && hitTestJack(clientX, clientY, el))
        return key
    }

    return null
  }, [jackById])

  const handleDown = useCallback((e) => {
    jackDown(e, { jackById, isDestConnected, cables, values, removeConnection, removeAll, containerRef, setFrom, setPreview, dragStartRef, isDraggingRef })
  }, [jackById, isDestConnected, cables, values, removeConnection, removeAll, setFrom, setPreview, dragStartRef, isDraggingRef, containerRef])

  const handleMove = useCallback((e) => {
    if (!from)
      return
    if (!isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y
      if (Math.hypot(dx, dy) < 4)
        return
      isDraggingRef.current = true
    }
    setPreview(svgCoords(e, containerRef.current))
  }, [from, setPreview, dragStartRef, isDraggingRef, containerRef])

  const handleUp = useCallback((e) => {
    if (!from)
      return
    if (isDraggingRef.current)
      addConnection(from.key, findTarget(e.clientX, e.clientY))

    setFrom(null)
    setPreview(null)
    isDraggingRef.current = false
  }, [from, addConnection, findTarget, setFrom, setPreview, isDraggingRef])

  return { handleDown, handleMove, handleUp }
}

export default function PatchBay({ params, values, setValue }) {
  const jackEntries = useMemo(() => Object.entries(params).filter(([, p]) => p.type === 'jack'), [params])
  const { cables, isDestConnected, addConnection, removeConnection, removeAll, jackIsConnected, jackById } = usePatchData(jackEntries, values, setValue)
  const { containerRef, from, setFrom, preview, setPreview, isDraggingRef, dragStartRef } = usePatchDrag()
  const { handleDown, handleMove, handleUp } = usePatchHandlers({ jackById, cables, isDestConnected, values, addConnection, removeConnection, removeAll, setFrom, setPreview, isDraggingRef, dragStartRef, containerRef, from })

  return (
    <div ref={containerRef} className={`patchbay${from ? ' patchbay--dragging' : ''}`} onPointerMove={handleMove} onPointerUp={handleUp}>
      <svg className="patchbay-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <CableLines cables={cables} />
        <PreviewCable from={from} preview={preview} />
      </svg>
      {jackEntries.map(([key, param]) => (
        <div
          key={key}
          data-jack={key}
          className={jackClass(param, jackIsConnected(key, param), from && from.key === key)}
          style={{ left: `${param.x}%`, top: `${param.y}%` }}
          title={param.label}
          onPointerDown={handleDown}
        />
      ))}
    </div>
  )
}
