import './ParamSidebar.css'

function groupBySection(params) {
  return Object.entries(params).reduce((acc, [key, param]) => {
    const section = param.group
    const existing = acc[section] || []

    return { ...acc, [section]: [...existing, [key, param]] }
  }, {})
}

function getDisplayValue(param, value, params) {
  if (param.type === 'jack') {
    if (param.direction === 'out' && Array.isArray(value) && value.length > 0)
      return value.map(k => params[k]?.label || k).join(', ')

    if (param.direction === 'in' && typeof value === 'string')
      return params[value]?.label || value

    return '\u2014'
  }

  if (param.type === 'switch') {
    const idx = Math.round(value * (param.options.length - 1))

    return param.options[idx]
  }

  return `${Math.round(value * 100)}%`
}

function ParamRow({ param, value, params }) {
  return (
    <div className="param-row">
      <span className="param-row-label">{param.label}</span>
      <span className="param-row-value">{getDisplayValue(param, value, params)}</span>
    </div>
  )
}

function ParamSection({ title, entries, values, params }) {
  return (
    <div className="param-section">
      <div className="param-section-header">{title}</div>
      {entries.map(([key, param]) => (
        <ParamRow key={key} param={param} value={values[key]} params={params} />
      ))}
    </div>
  )
}

export default function ParamSidebar({ synth, values }) {
  const sections = groupBySection(synth.params)

  return (
    <aside className="param-sidebar">
      <div className="param-sidebar-inner">
        {Object.entries(sections).map(([title, entries]) => (
          <ParamSection key={title} title={title} entries={entries} values={values} params={synth.params} />
        ))}
      </div>
    </aside>
  )
}
