import { useState } from 'react'

export default function useUndoHistory(limit = 30) {
  const [stack, setStack] = useState([])

  const push = (values) => {
    setStack((h) => {
      const next = [...h, { ...values }]

      return next.length > limit ? next.slice(-limit) : next
    })
  }

  const undo = () => {
    if (stack.length === 0)
      return null
    const restored = stack.at(-1)
    setStack(h => h.slice(0, -1))

    return restored
  }

  const clear = () => {
    setStack([])
  }

  return { push, undo, clear, hasUndo: stack.length > 0 }
}
