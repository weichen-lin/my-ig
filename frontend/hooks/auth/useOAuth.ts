import { useEffect, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

export interface oAuth {
  platform: OAuthPlatform
  code: string
}

type OAuthPlatform = 'Github' | 'Facebook' | 'Google'

export default function useOAuth(props: oAuth) {
  const { platform, code } = props

  useEffect(() => {
    axios
      .post('http://localhost:8080/user/oauth', { platform, code })
      .then(() => {
        Router.push('/home')
      })
      .catch(() => Router.push('/login'))
  }, [])
}
