interface CookieParser {
  cookie: string | undefined
  name: string
}

export interface TokenProp {
  token: string | null
  current: string
  folder: string | null
}

export default function CookieParser({ cookie, name }: CookieParser) {
  if (!cookie) return null
  const value = `; ${cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) {
    const token = parts.pop()?.split(';').shift()
    return token
  }

  return null
}
