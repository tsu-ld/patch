import './Tooltip.css'

export default function Tooltip({ text, children }) {
  return (
    <div className="tooltip-wrapper">
      {children}
      <span className="tooltip-text">{text}</span>
    </div>
  )
}
