import { Script } from '@app/processor/lib/Script';
import { setBrowser } from '@app/processor/utils/browserServices';

export async function runCustomTests(jsonObject: any, config: any) {
  if (config.projects) {
    const reporter = config.reporter
    const browserPromises = config.projects.map(async (project) => {
      const { use } = project
      const { browserName } = use
      const browser = await setBrowser(browserName, use)
      const context = await browser.newContext(use)
      const { testCase } = jsonObject
      const page = await context.newPage()
      const script = new Script(testCase, page)
      await script.execute()
      await browser.close()
    })


    await Promise.all(browserPromises)
  }
}
// test('Initial testing', async () => {
//   if (config.projects) {
//     const browserPromises = config.projects.map(async (project) => {
//       const { use } = project
//       const { browserName } = use
//       const browser = await setBrowser(browserName, use)
//       const context = await browser.newContext(use)
//       const jsonFilePath = process.env.JSON_FILE_PATH

//       if (!jsonFilePath) {
//         console.error('Please set the environment variable JSON_FILE_PATH')
//         process.exit(1)
//       }

//       const { testCases } = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'))

//       const page = await context.newPage()
//       const scripts = testCases.map(async (testCase) => {
//         const script = new Script(testCase, page)
//         await script.execute()
//       })
//       await Promise.all(scripts)
//       await browser.close()
//     })

//     await Promise.all(browserPromises)
//   }
// })
