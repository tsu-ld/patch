import { createRoot } from 'react-dom/client'
import Router from '@/providers/router/index.jsx'

function App() {
  return (
    <>
      <div className="tsu-grid" aria-hidden="true" />
      <div className="tsu-grain" aria-hidden="true" />
      <Router />
    </>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
