import useDrag from '@/hooks/useDrag'
import './Knob.css'

function keyStep(key, shift) {
  if (key === 'ArrowUp' || key === 'ArrowRight')
    return shift ? 0.05 : 0.01
  if (key === 'ArrowDown' || key === 'ArrowLeft')
    return shift ? -0.05 : -0.01
  if (key === 'Home')
    return 1
  if (key === 'End')
    return 0

  return null
}

export default function Knob({ value, onChange, label }) {
  const { onDown, dragging } = useDrag(value, onChange)
  const deg = -135 + value * 270

  const handleKeyDown = (e) => {
    const step = keyStep(e.key, e.shiftKey)
    if (step === null)
      return
    if (step === 1 || step === 0) {
      e.preventDefault()
      onChange(step)
    }
    else {
      e.preventDefault()
      onChange(Math.max(0, Math.min(1, value + step)))
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuenow={Math.round(value * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={onDown}
        onKeyDown={handleKeyDown}
        className={`knob-body${dragging ? ' is-dragging' : ''}`}
      >
        <div
          className="knob-indicator"
          style={{ transform: `translateX(-50%) rotate(${deg}deg)` }}
        />
      </div>
      {dragging && (
        <span className="knob-readout">
          {`${Math.round(value * 100)}%`}
        </span>
      )}
    </div>
  )
}
