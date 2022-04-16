export interface TestParams {
  categoryId?: number
  limit?: number
  page?: number
}

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
