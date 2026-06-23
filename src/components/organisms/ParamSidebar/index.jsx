import styles from './styles.module.css'

function groupBySection(params) {
  return Object.entries(params).reduce((acc, [key, param]) => {
    const section = param.group
    const existing = acc[section] || []

    return { ...acc, [section]: [...existing, [key, param]] }
  }, {})
}

function isModified(param, value) {
  if (param.type === 'jack') {
    if (Array.isArray(value))
      return value.length > 0

    return value !== null
  }
  if (param.type === 'switch') {
    const idx = param.options.indexOf(param.default)

    return Math.abs(value - idx / (param.options.length - 1)) > 0.001
  }

  return Math.abs(value - param.default) > 0.001
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
  const modified = isModified(param, value)

  return (
    <div className={`${styles.row}${modified ? ` ${styles.modified}` : ''}`}>
      <span className={styles.label}>{param.label}</span>
      <span className={styles.value}>{getDisplayValue(param, value, params)}</span>
    </div>
  )
}

function ParamSection({ title, entries, values, params }) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>{title}</div>
      {entries.map(([key, param]) => (
        <ParamRow key={key} param={param} value={values[key]} params={params} />
      ))}
    </div>
  )
}

export default function ParamSidebar({ synth, values }) {
  const sections = groupBySection(synth.params)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.inner}>
        {Object.entries(sections).map(([title, entries]) => (
          <ParamSection key={title} title={title} entries={entries} values={values} params={synth.params} />
        ))}
      </div>
    </aside>
  )
}
