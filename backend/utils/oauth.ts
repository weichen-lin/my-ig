import axios from 'axios'

// https://github.com/login/oauth/authorize?client_id=6e7a0aec3433971e0008&amp;scope=user:email

interface GithubOAuth {
  accessTokenUrl: string
  userProfileUrl: string
  token?: string
  client_id?: string
  client_secret?: string
  code?: string
}

export class OauthHelper {
  private githubAuth?: GithubOAuth
  private facebookAuth?: {}
  private googleAuth?: {}
  private errorMsg: string

  constructor({ platform, ...params }: { platform: string }) {
    switch (platform) {
      case 'Github':
        this.githubAuth = {
          accessTokenUrl: 'https://github.com/login/oauth/access_token',
          userProfileUrl: 'https://api.github.com/user',
          client_id: '6e7a0aec3433971e0008',
          client_secret: '',
          ...params,
        }
        break
      case 'Facebook':
        this.facebookAuth = {}
        break
      case 'Google':
        this.googleAuth = {}
        break
      default:
        throw new Error('No match platform to do oAuth!')
    }

    this.errorMsg = 'Something wrong...'
  }

  private getGithubAccessToken = () => {
    if (this.githubAuth) {
      return axios.post(
        this.githubAuth.accessTokenUrl,
        {
          client_id: this.githubAuth.client_id,
          client_secret: this.githubAuth.client_secret,
          code: this.githubAuth?.code ?? '',
        },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
    } else {
      return Promise.reject('No exist github oAuth to do Oauth!')
    }
  }

  private getGithubUserProfile = (accessToken: string) => {
    if (this.githubAuth) {
      return axios.get(this.githubAuth.userProfileUrl, {
        headers: {
          Accept: 'application/json',
          Authorization: `token ${accessToken}`,
        },
      })
    } else {
      return Promise.reject('No exist github oAuth to do Oauth!')
    }
  }

  public AuthGithub = async () => {
    try {
      const getAccess = await this.getGithubAccessToken()
      if (getAccess.status === 200) {
        const { access_token } = getAccess.data
        const getUserProfile = await this.getGithubUserProfile(access_token)
        if (getUserProfile.status === 200) {
          //   return Promise.resolve(getUserProfile.data)
          return Promise.resolve(getUserProfile.data)
        } else {
          return Promise.reject('get user profile error')
        }
      } else {
        return Promise.reject('get access token error')
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
