import type { Metadata } from 'next'
import { Alata } from 'next/font/google'
import './globals.css'
import { ThemeProvider, AuthProvider } from '@/components/provider'

const inter = Alata({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Kushare',
  description: ''
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
