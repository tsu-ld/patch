import { useCallback, useEffect, useState } from 'react'
import { RouterContext } from './context.js'

const routes = import.meta.glob('../../routes/**/*.jsx', { eager: true })

// ponytail: manual overrides for folder-based route files
const ROUTE_OVERRIDES = {
  '../../routes/Landing/index.jsx': '/',
  '../../routes/Editor/index.jsx': '/editor',
}

function buildRouteMap() {
  const map = []

  for (const [filepath, mod] of Object.entries(routes)) {
    let pattern = ROUTE_OVERRIDES[filepath]

    if (!pattern) {
      pattern = filepath
        .replace('../../routes', '')
        .replace(/\.jsx$/, '')
        .replace(/\/index$/, '/')
        .replace(/\[(\w+)\]/g, ':$1')

      pattern = normalizePattern(pattern)
    }

    const keys = []
    const regexStr = pattern
      .replace(/:(\w+)/g, (_, key) => {
        keys.push(key)

        return '([^/]+)'
      })
      .replace(/\//g, '\\/')

    const regex = new RegExp(`^${regexStr}$`)

    map.push({ pattern, regex, keys, component: mod.default })
  }

  return map
}

function normalizePattern(p) {
  if (p === '')
    return '/'
  if (!p.startsWith('/'))
    return `/${p}`
  if (p !== '/' && p.endsWith('/'))
    return p.slice(0, -1)

  return p
}

function matchRoute(routeMap, path) {
  for (const route of routeMap) {
    const match = path.match(route.regex)

    if (match) {
      const params = {}

      route.keys.forEach((key, i) => {
        params[key] = match[i + 1]
      })

      return { component: route.component, params }
    }
  }

  return null
}

const routeMap = buildRouteMap()
const notFound = routeMap.find(r => r.pattern === '/404')

function NotFound() {
  return <>404</>
}

export default function Router() {
  const [path, setPath] = useState(() => window.location.pathname)
  const matched = matchRoute(routeMap, path)
  const Component = matched?.component || notFound?.component || NotFound

  useEffect(() => {
    function onPopState() {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', onPopState)

    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to) => {
    history.pushState(null, '', to)
    setPath(to.split('?')[0]) // Keep just the path for router match
  }, [])

  return (
    <RouterContext value={{ navigate, params: matched?.params || {} }}>
      {Component ? <Component params={matched?.params || {}} /> : null}
    </RouterContext>
  )
}
