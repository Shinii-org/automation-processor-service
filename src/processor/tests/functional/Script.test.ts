
// import { FileJson } from "interfaces/common.interface";
// import { Script } from "@lib/Script";
// import fs from 'fs';
// import config from "playwright.config";
// import { setBrowser } from "utils/browserServices";

// import { test } from '@playwright/test'


// test('Initial testing', async () => {

//   const browserPromises = config.projects.map(async (project) => {
//     const { use } = project
//     const { browserName } = use
//     const browser = await setBrowser(browserName, use)
//     const context = await browser.newContext(use);
//     const jsonFilePath = process.env.JSON_FILE_PATH;

//     if (!jsonFilePath) {
//       console.error("Please set the environment variable JSON_FILE_PATH");
//       process.exit(1);
//     }

//     const { testCases }: FileJson = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

//     const page = await context.newPage();
//     const scripts = testCases.map(async (testCase) => {
//       const script = new Script(testCase, page)
//       await script.execute();
//     })
//     await Promise.all(scripts);
//     await browser.close();
//   });

//   await Promise.all(browserPromises);

// })

