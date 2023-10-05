import { ACTION_TYPE } from '../core/actions/strategy'

export interface Step {
  id: string
  name: string
  receiver: Receiver
  timeout: number
}
export interface Receiver {
  where: string
  action: ACTION_TYPE
  value: string
  timeout?: number
}
export interface TestCase {
  name: string
  id: string
  url: string
  steps: Step[]
}

export interface FileJson {
  testCase: TestCase
}
