


import fs from 'fs';
import path from 'path'
import { test } from '@playwright/test'
import { APP } from '../../src/app.config'
import { getPlaywrightConfig } from '../../src/utils/get-playwright-config';
import { setBrowser } from '../../src/processor/utils/browserServices'
import { Script } from '../../src/processor/lib/Script'


test('Initial testing', async () => {
  const jsonFilePath = process.env.JSON_FILE_PATH;
  const fileName = path.basename(jsonFilePath as any);
  console.log(fileName, 'fileName')
  const directoryPath = `${APP.ROOT_PATH}/records/record-${fileName}`;
  const pathInfo = path.parse(directoryPath);

  // Construct the new file path without the ".json" extension
  const newFilePath = path.join(pathInfo.dir, pathInfo.name);
  const config = await getPlaywrightConfig(`./report-html`)
  if (config.projects) {
    const browserPromises = config.projects.map(async (project) => {
      const { use } = project
      const { browserName } = use
      const browser = await setBrowser(browserName, use)
      const context = await browser.newContext(use)

      const { testCase } = JSON.parse(fs.readFileSync(jsonFilePath as any, 'utf-8'));
      const page = await context.newPage()
      const script = new Script(testCase, page)
      await script.execute()
      await browser.close()
    })


    await Promise.all(browserPromises)
  }

})

