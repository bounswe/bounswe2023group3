// user.model.ts
export interface User {
  id: string
  email: string
  username: string
  isVerified: boolean
  password: string
  verification_code: number
  reset_password_token: number
}