import { Page } from '@playwright/test'

import { WebComponent } from './WebComponent'
import { ICommand } from '../core/command/command'

import { Invoker } from '../core/invoker/invoker'
import { TestCase } from '../interfaces/common.interface'

export class Script implements ICommand {
  private testCase: TestCase
  private page: Page
  constructor(testCases: TestCase, page: Page) {
    this.testCase = testCases
    this.page = page
  }
  public async execute() {
    const invoker = new Invoker()
    await this.navigate()

    for (const [index, step] of this.testCase.steps.entries()) {
      const command = new WebComponent(this.page, {
        step,
        currentStepIndex: index,
        total: this.testCase.steps.length,
        id: this.testCase.id
      })
      invoker.addCommand(command)
    }
    await invoker.executeCommands()
  }

  private async navigate() {
    try {
      await this.page.goto(this.testCase.url)
    } catch (err) {
      console.error(err)
    }

  }
}
