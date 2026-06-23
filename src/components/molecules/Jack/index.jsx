import styles from './styles.module.css'

export default function Jack({ isConnected, isActive, className = '', ...rest }) {
  const cls = [
    styles.jack,
    className,
    isConnected ? styles.connected : '',
    isActive ? styles.active : '',
  ].filter(Boolean).join(' ')

  return <div className={cls} {...rest} />
}
