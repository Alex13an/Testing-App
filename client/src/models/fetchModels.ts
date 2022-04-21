export type ISort = 'id' | 'title'

export type ISortType = 'ASC' | 'DESC'

export interface TestParams {
  categoryId?: number
  limit: number
  page: number
}

export type SortTestParams = TestParams &
  (
    | {
        sort?: never
        sortType?: never
      }
    | {
        sort: ISort
        sortType: ISortType
      }
  )

export interface PassedTest {
  testId: number
  result: number
}

export interface PassedTests {
  user: number
  test: PassedTest
}

export interface PassedTestsUser {
  userId: number
  userTests: {
    testId: number
  }[]
}

export interface CleanPassedTest {
  testId: number
  title: string
  description: string
  result: string
  categoryId: number
}
