interface CookieParser {
  cookie: string | undefined
  name: string
}

export default function useCookie({ cookie, name }: CookieParser) {
  if (!cookie) return null
  const value = `; ${cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) {
    const token = parts.pop()?.split(';').shift()
    return token
  }

  return null
}
