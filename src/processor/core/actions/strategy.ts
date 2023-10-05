import { Receiver } from "@app/processor/interfaces/common.interface";
import { Locator } from "@playwright/test";
;


export interface ActionStrategy {
  execute(): Promise<void>;
}
export enum ACTION_TYPE {
  CLICK = 'click',
  FILL = 'fill',
}

class ClickActionStrategy implements ActionStrategy {
  private webComponent: Locator

  constructor(webComponent: Locator) {
    this.webComponent = webComponent;
  }
  async execute(): Promise<void> {
    await this.webComponent.click();
  }
}

class FillActionStrategy implements ActionStrategy {
  private webComponent: Locator
  private receiver: Receiver
  constructor(webComponent: Locator, receiver: Receiver) {
    this.webComponent = webComponent;
    this.receiver = receiver
  }
  async execute(): Promise<void> {
    await this.webComponent.fill(this.receiver.value);
  }
}


export const ACTION_STRATEGIES: Record<ACTION_TYPE, new (webComponent: Locator, receiver: Receiver) => ActionStrategy> = {
  [ACTION_TYPE.CLICK]: ClickActionStrategy,
  [ACTION_TYPE.FILL]: FillActionStrategy

  // add another action
}