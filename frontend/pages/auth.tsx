import { Loading } from 'components/utils'
import { GetServerSideProps } from 'next'
import { RecoilEnv } from 'recoil'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { tokenAuth, useFetch } from 'api'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

const Success = () => {
  const [seconds, setSeconds] = useState(3)
  const router = useRouter()
  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)

      return () => clearInterval(timerId)
    }
    if (seconds === 0) {
      router.push('/home')
    }
  }, [seconds])

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-y-2'>
      <Image src='/icon/layout/skateboarding.png' width={250} height={250} alt='success' />
      <p className='font-bold'>帳號驗證成功</p>
      {seconds > 0 && `倒數 ${seconds} 後將引導至首頁`}
    </div>
  )
}

export default function IndexPage(props: { token: string | null }) {
  const { token } = props
  const [isValidate, setIsValidate] = useState(false)
  const router = useRouter()
  const { run } = useFetch(tokenAuth, {
    onSuccess: () => setIsValidate(true),
    onError: () => router.push('/login'),
  })

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }

    run(token)
  }, [])

  return !isValidate ? <Loading /> : <Success />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const token = query.token ?? null
  return {
    props: {
      token,
    },
  }
}
