export interface IUser {
  email: string
  password: string
  role?: 'USER' | 'ADMIN'
}
