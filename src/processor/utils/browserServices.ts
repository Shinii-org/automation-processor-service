import { Browser, BrowserContextOptions, BrowserType, chromium, firefox, webkit } from '@playwright/test';
import { ENGINE_TYPE } from '../constants/constants';

export async function setBrowser(engineType: string, use: BrowserContextOptions): Promise<Browser> {
  let browserType: BrowserType<Partial<BrowserContextOptions>>

  switch (engineType) {
    case ENGINE_TYPE.CHROMIUM:
      browserType = chromium;
      break;
    case ENGINE_TYPE.FIREFOX:
      browserType = firefox;
      break;
    case ENGINE_TYPE.WEBKIT:
      browserType = webkit;
      break;
    default:
      throw new Error(`Unsupported engine type: ${engineType}`);
  }

  const browser = await browserType.launch(use);
  return browser;
}

