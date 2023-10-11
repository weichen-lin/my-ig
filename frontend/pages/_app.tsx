import 'styles/globals.css'

import Head from 'next/head'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'

import { RecoilRoot } from 'recoil'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: JSX.Element) => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page)

  return (
    <>
      <Head>
        <title>Kushare</title>
        <link rel='icon' type='image/x-icon' href='static/favicon.png' />
      </Head>
      {getLayout(
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>,
      )}
    </>
  )
}
