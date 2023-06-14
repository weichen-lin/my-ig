import axios from 'axios'

// https://github.com/login/oauth/authorize?client_id=8d64abb54295cfe2d88a&amp;scope=user:email
const github_client_id = '6e7a0aec3433971e0008'

interface GithubOAuth {
  accessTokenUrl: string
  userProfileUrl: string
  code: string
  token: string
  client_id: string
  client_secret: string
}

export class OauthHelper {
  private githuAuth: GithubOAuth
  private errorMsg: string

  constructor({ platform, ...params }: { platform: string }) {
    this.githuAuth = {
      token: '',
      accessTokenUrl: 'https://github.com/login/oauth/access_token',
      userProfileUrl: 'https://api.github.com/user',
      client_id: '',
      client_secret: '',
      code: '',
    }

    this.errorMsg = 'Something wrong...'
  }

  private getGithubAccessToken = () => {
    return axios.post(
      this.githuAuth.accessTokenUrl,
      {
        client_id: '',
        client_secret: '',
        code: '',
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
  }

  private getGithubUserProfile = (accessToken: string) => {
    return axios.get(this.githuAuth.userProfileUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `token ${accessToken}`,
      },
    })
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
      return Promise.reject('error undefined')
    }
  }
}

//         {
//   "access_token": "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",
//   "token_type": "bearer",
//   "scope": "user:email"
// }
//       }
