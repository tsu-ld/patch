import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './styles.module.css'

const TWO = 2
const GAP = 8

export default function Tooltip({ text, children }) {
  const ref = useRef(null)
  const posRef = useRef({})
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!hovered || !ref.current)
      return
    const r = ref.current.getBoundingClientRect()
    posRef.current = {
      left: r.left + r.width / TWO,
      bottom: window.innerHeight - r.top + GAP,
    }
  }, [hovered])

  return (
    <div
      ref={ref}
      className={styles.wrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && createPortal(
        <span
          className={styles.text}
          style={{
            left: posRef.current.left,
            bottom: posRef.current.bottom,
            position: 'fixed',
            opacity: 1,
            visibility: 'visible',
          }}
        >
          {text}
        </span>,
        document.body,
      )}
    </div>
  )
}
