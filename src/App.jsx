import { createRoot } from 'react-dom/client'
import Router from '@/providers/router/index.jsx'

function App() {
  return <Router />
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
