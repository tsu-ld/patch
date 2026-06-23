import { createRoot } from 'react-dom/client'
import Grain from '@/components/atoms/Grain'
import Grid from '@/components/atoms/Grid'
import Router from '@/providers/router/index.jsx'

function App() {
  return (
    <>
      <Grid />
      <Grain />
      <Router />
    </>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
