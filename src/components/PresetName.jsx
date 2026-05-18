import { useRef } from 'react'
import './PresetName.css'

export default function PresetName({ name, onChange }) {
  const ref = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter')
      ref.current?.blur()
  }

  return (
    <input
      ref={ref}
      className="preset-name"
      value={name}
      onChange={e => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Untitled preset"
      size={Math.max(14, name.length + 2)}
    />
  )
}
