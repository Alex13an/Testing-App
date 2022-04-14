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
  tests: PassedTest[]
}
