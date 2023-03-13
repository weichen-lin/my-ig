import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    console.log('404 page')
    router.replace('/')
  })

  return null
}
