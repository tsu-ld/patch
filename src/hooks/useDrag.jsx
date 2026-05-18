import { useEffect, useRef, useState } from 'react'

let styleEl = null

export default function useDrag(value, onChange) {
  const [dragging, setDragging] = useState(false)
  const dragStateRef = useRef({ startY: 0, startValue: 0, onChange })
  dragStateRef.current.onChange = onChange

  const onMove = (e) => {
    const delta = (dragStateRef.current.startY - e.clientY) / 50
    const next = Math.max(0, Math.min(1, dragStateRef.current.startValue + delta))
    dragStateRef.current.onChange(next)

    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.textContent = '* { cursor: none !important }'
      document.head.appendChild(styleEl)
    }
    setDragging(true)
  }

  const onUp = () => {
    if (styleEl) {
      styleEl.remove()
      styleEl = null
    }
    setDragging(false)
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerup', onUp)
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }

  const onDown = (e) => {
    e.preventDefault()
    if (e.pointerId !== undefined && e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId)
    }
    dragStateRef.current.startY = e.clientY
    dragStateRef.current.startValue = value

    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  // eslint-disable-next-line react/exhaustive-deps
  useEffect(() => onUp, [])

  return { onDown, dragging, value }
}
