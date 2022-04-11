export interface IUser {
  email: string
  password: string
  role?: 'USER' | 'ADMIN'
}

export interface IQuestion {
  id?: number
  body: string
  scale: number
}

export interface IResult {
  id?: number
  body: string
  breach: number
}

export interface ITest {
  id: number
  title: string
  description: string
  rating: number
  categoryId: number
}

export interface ITestFull extends ITest {
  questions: IQuestion[]
  results: IResult[]
}

export interface ITestCreate {
  title: string
  description: string
  categoryId: number
  questions: IQuestion[]
  results: IResult[]
}

export interface ITests {
  counts: number
  rows: ITest[]
}

export interface ICategory {
  id: number
  name: string
}
