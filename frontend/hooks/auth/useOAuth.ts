import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

interface OAuth {
  Gituhb: GithubOAuth
}

interface GithubOAuth {
  code: string
}

type OAuthPlatform = 'Github' | 'Facebook' | 'Google' | 'Email'

const platformChecker = (arr: string[]): OAuthPlatform => {
  const arrayChecker = arr.sort().join(',')

  switch (arrayChecker) {
    case 'code':
      return 'Github'
    case 'facebook':
      return 'Facebook'
    case 'google':
      return 'Google'
    default:
      return 'Email'
  }
}

export default function useOAuth(props: OAuth['Gituhb']) {
  const [isChecking, setIsChecking] = useState(false)

  const paramsKey = Object.keys(props)
  const platform = platformChecker(paramsKey)

  return { isChecking }
}
