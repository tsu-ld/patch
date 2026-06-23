import ControlRenderer from '@/components/ControlRenderer'
import Tooltip from '@/components/molecules/Tooltip'

export default function SynthControl({ paramKey, param, values, setValue }) {
  return (
    <div
      key={paramKey}
      style={{
        position: 'absolute',
        left: `${param.x}%`,
        top: `${param.y}%`,
      }}
    >
      <Tooltip text={param.description}>
        <div style={{ transform: 'translate(-50%, -50%)' }}>
          <ControlRenderer
            param={param}
            value={values[paramKey]}
            onChange={v => setValue(paramKey, v)}
          />
        </div>
      </Tooltip>
    </div>
  )
}
