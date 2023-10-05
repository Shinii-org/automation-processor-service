

import { Locator } from "@playwright/test";
import { ACTION_STRATEGIES, ACTION_TYPE, ActionStrategy } from "./strategy";
import { Receiver } from "@app/processor/interfaces/common.interface";


export class ActionStrategyFactory {
  createStrategy(actionType: ACTION_TYPE, webComponent: Locator, receiver: Receiver): ActionStrategy {
    const StrategyClass = ACTION_STRATEGIES[actionType];
    if (StrategyClass) {
      return new StrategyClass(webComponent, receiver);
    } else {
      throw new Error(`Unsupported action type: ${actionType}`);
    }
  }
}