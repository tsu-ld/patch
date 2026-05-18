import { useState } from 'react'

export default function ShareButton({ shareUrl }) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    shareUrl()
    setCopied(true)
    setTimeout(setCopied, 2000, false)
  }

  return (
    <button onClick={handleClick}>
      {copied ? 'Copied!' : 'Share'}
    </button>
  )
}
