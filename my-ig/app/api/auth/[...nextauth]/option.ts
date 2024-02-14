import GitHubProvider from 'next-auth/providers/github'
import type { AuthOptions } from 'next-auth'

export const options: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ]
}
