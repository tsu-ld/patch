import { use } from 'react'
import { RouterContext } from './context.js'

export function useRouter() {
  return use(RouterContext)
}
