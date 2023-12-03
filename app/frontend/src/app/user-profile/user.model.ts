// user.model.ts
export interface User {
  id: string
  email: string
  username: string
  isVerified: boolean
  password: string
  firstname: string
  lastname: string
  verification_code: number
  reset_password_token: number
  badges: string[]
  followers: User[]
  followings: User[]
}
