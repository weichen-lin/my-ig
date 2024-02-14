'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ModeToggle } from '@/components/ui/toggle'
import { GithubLogo, FacebookLogo, GoogleLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export default function Index() {
  const handleSignIn = async () => {
    const result = await signIn('github', { callbackUrl: '/stars' })
    if (result?.error) {
      console.error('Sign in failed:', result.error)
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-full max-w-[600px]'>
        <header className='py-4 lg:py-6 xl:py-8 w-full'>
          <div className='container flex items-center justify-around px-4 md:px-6 gap-x-6'>
            <div className='flex gap-x-6 items-center'>
              <Link href='/'>
                <Image src='/icon.png' width={40} height={40} alt=''></Image>
              </Link>
              Kushare
            </div>
            <ModeToggle />
          </div>
        </header>
        <section className='w-full py-4'>
          <div className='container flex items-center justify-center gap-4 px-4 md:px-6'>
            <Image
              src='/auth.png'
              alt='home page'
              width={350}
              height={350}
            ></Image>
          </div>
        </section>
        <div className='flex flex-col gap-y-4 w-full items-center'>
          <Button variant='outline' className='w-[200px]'>
            <span className='flex items-center justify-center gap-2'>
              <GithubLogo className='w-6 h-6'></GithubLogo>
              Sign in with GitHub
            </span>
          </Button>
          <Button variant='outline' className='w-[200px]'>
            <span className='flex items-center justify-center gap-2'>
              <FacebookLogo className='w-6 h-6'></FacebookLogo>
              Sign in with Facebook
            </span>
          </Button>
          <Button variant='outline' className='w-[200px]'>
            <span className='flex items-center justify-center gap-2'>
              <GoogleLogo className='w-6 h-6'></GoogleLogo>
              Sign in with Google
            </span>
          </Button>
        </div>
        <footer className='w-full'>
          <div className='container flex flex-col items-center justify-center py-8 text-center md:py-12 lg:py-16 xl:py-24 md:flex-row md:space-x-2 md:space-y-0'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              © 2024 WeiChen Lin. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
      <div className='hidden lg:flex flex-1 h-full items-center justify-center bg-gradient-to-br from-slate-100/30 to-slate-500/60'>
        <Image alt='login' src='/login.jpg' width={400} height={400}></Image>
      </div>
    </div>
  )
}
