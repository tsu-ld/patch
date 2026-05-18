import { useRouter } from './hooks.jsx'

export default function Link({ to, children, ...props }) {
  const { navigate } = useRouter()

  return (
    <a
      href={to}
      {...props}
      onClick={(e) => {
        e.preventDefault()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}
