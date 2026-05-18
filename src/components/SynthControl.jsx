import ControlRenderer from '@/components/ControlRenderer'
import Tooltip from '@/components/Tooltip'

export default function SynthControl({ paramKey, param, values, setValue }) {
  return (
    <div
      key={paramKey}
      style={{
        position: 'absolute',
        left: `${param.x}%`,
        top: `${param.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Tooltip text={param.description}>
        <ControlRenderer
          param={param}
          value={values[paramKey]}
          onChange={v => setValue(paramKey, v)}
        />
      </Tooltip>
    </div>
  )
}
