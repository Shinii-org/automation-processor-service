import { Page, Locator as PlaywrightLocator } from '@playwright/test'
import fs from 'fs'
import { Step } from '../interfaces/common.interface'
import { ICommand } from '../core/command/command'
import { ActionStrategyFactory } from '../core/actions/factory'

export interface StepResponse {
  step: Step
  currentStepIndex: number
  total: number
  id: string
}

export class WebComponent implements ICommand {
  readonly webComponent: PlaywrightLocator
  readonly page: Page

  readonly stepResponse: StepResponse
  private actionStrategyFactory: ActionStrategyFactory
  constructor(page: Page, stepResponse: StepResponse) {
    this.webComponent = page.locator(stepResponse.step.receiver.where)
    this.page = page

    this.stepResponse = stepResponse
    this.actionStrategyFactory = new ActionStrategyFactory()
  }
  async execute(): Promise<void> {
    await this.delay()
    await this.waitForComponentLoaded()
    await this.handleAction()
  }

  writeFile(status: 'fail' | 'success'): void {
    fs.writeFileSync(
      `../../../../records/record-${this.stepResponse.id}/step-${this.stepResponse.currentStepIndex}.json`,
      JSON.stringify(
        {
          action: this.stepResponse.step.receiver.action,
          value: this.stepResponse.step.receiver.value,
          stepResponse: this.stepResponse,
          status: status
        },
        null,
        2
      )
    )
  }
  async handleAction(): Promise<void> {
    const isDisabled = await this.isDisabled()
    const isVisible = await this.isVisible()
    if (!isDisabled && isVisible) {
      if (!this.stepResponse.step.receiver.action) {
        throw new Error('Action strategy is not set')
      }
      const actionStrategyInstance = this.actionStrategyFactory.createStrategy(
        this.stepResponse.step.receiver.action,
        this.webComponent,
        this.stepResponse.step.receiver
      )
      try {
        await actionStrategyInstance.execute()
        // this.writeFile('success')
      } catch (error) {
        // this.writeFile('fail')
      }
    }
  }

  async isDisabled(): Promise<boolean> {
    return await this.webComponent.isDisabled()
  }
  async isVisible(): Promise<boolean> {
    return await this.webComponent.isVisible()
  }
  async delay(): Promise<void> {
    if (this.stepResponse.step.receiver.timeout)
      await this.page.waitForTimeout(this.stepResponse.step.receiver.timeout)
  }
  async waitForComponentLoaded(): Promise<void> {
    await this.page.waitForSelector(this.stepResponse.step.receiver.where)
  }
}
