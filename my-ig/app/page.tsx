'use client'

import Image from 'next/image'
import clsx from 'clsx'
// import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { Folders, HandGrabbing, ShareFat } from '@phosphor-icons/react'
// import { ModeToggle } from '@/components/provider'
// import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Lamp } from '@/components/ui/lamp'
import { ModeToggle } from '@/components/ui/toggle'

export default function Index() {
  const words = [
    {
      text: 'Start',
      className: 'text-xl lg:text-3xl'
    },
    {
      text: 'managing',
      className: 'text-xl lg:text-3xl'
    },
    {
      text: 'your',
      className: 'text-xl lg:text-3xl'
    },
    {
      text: 'stars',
      className: 'text-xl lg:text-3xl'
    },
    {
      text: 'with',
      className: 'text-xl lg:text-3xl'
    },
    {
      text: 'StarGazer.',
      className: 'text-xl text-blue-500 dark:text-blue-500 lg:text-3xl'
    }
  ]

  const { data: session } = useSession()

  const handleSignIn = async () => {
    const result = await signIn('github', { callbackUrl: '/stars' })
    if (result?.error) {
      console.error('Sign in failed:', result.error)
    }
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='py-4 lg:py-6 xl:py-8 drop-shadow-sm backdrop-blur-md w-full'>
        <div className='container flex items-center justify-between px-4 md:px-6 gap-x-6'>
          <div className='flex gap-x-6 items-center'>
            <Image src='/icon.png' width={40} height={40} alt=''></Image>
            Kushare
          </div>
          <ModeToggle />
        </div>
      </header>
      <Lamp />
      <section className='w-full py-12 lg:py-24 xl:py-32 mt-12'>
        <div className='container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
              Organize your memories with ease
            </h1>
            <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
              Effortlessly group your photos into folders. Say goodbye to
              cluttered galleries.
            </p>
          </div>
          <div className='space-y-4'>
            <Link
              className='mt-8 inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
              href='/login'
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className='w-full py-4'>
        <div className='container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6'>
          <Image
            src='/album.png'
            alt='home page'
            width={350}
            height={350}
          ></Image>
        </div>
      </section>
      <section className='w-full py-2 lg:py-24'>
        <div className='container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              Key Features
            </h2>
            <p className='max-w-[700px] text-gray-500 md:text-xl/relaxed xl:text-xl/relaxed dark:text-gray-400'>
              Organize your photos with powerful tools designed for simplicity.
            </p>
          </div>
          <div className='grid max-w-sm gap-4 md:grid-cols-2 lg:max-w-none lg:grid-cols-3'>
            <div className='flex flex-col items-center space-y-1'>
              <Folders size={48} />
              <h3 className='text-lg font-medium'>Smart Folders</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Automatically organize your photos.
              </p>
            </div>
            <div className='flex flex-col items-center space-y-1'>
              <HandGrabbing size={48} />
              <h3 className='text-lg font-medium'>Drag & Drop</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Intuitively move photos between folders.
              </p>
            </div>
            <div className='flex flex-col items-center space-y-1'>
              <ShareFat size={48} />
              <h3 className='text-lg font-medium'>Shareable Albums</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Easily create collections to share with friends.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 lg:py-24'>
        <div className='container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6'>
          <div className='max-w-[700px] space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              Effortless Organization
            </h2>
            <p className='text-gray-500 md:text-xl/relaxed xl:text-2xl/relaxed dark:text-gray-400'>
              With our app, you can spend less time organizing and more time
              enjoying your photos.
            </p>
          </div>
        </div>
      </section>
      <footer className='w-full'>
        <div className='container flex flex-col items-center justify-center py-8 text-center md:py-12 lg:py-16 xl:py-24 md:flex-row md:space-x-2 md:space-y-0'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            © 2024 WeiChen Lin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
