import Knob from '@/components/Knob'
import Switch from '@/components/Switch'
import './ControlRenderer.css'

export default function ControlRenderer({ param, value, onChange }) {
  if (param.type === 'knob') {
    return <Knob value={value} onChange={onChange} label={param.label} />
  }

  if (param.type === 'switch') {
    return (
      <Switch
        value={value}
        options={param.options}
        onChange={onChange}
        label={param.label}
      />
    )
  }

  if (param.type === 'jack')
    return null

  return (
    <input
      type="range"
      className="slider-vertical"
      min={param.min}
      max={param.max}
      step="0.01"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
    />
  )
}
