/**
 * @module utils/get-playright-config
 *
 */

import { DEFAULT_PLAYWRIGHT_CONFIG } from '@app/constants'

export const getPlaywrightConfig = (output: string) => {
  const customizedConfig = { ...DEFAULT_PLAYWRIGHT_CONFIG }

  const htmlReporterIndex = customizedConfig.reporter.findIndex(
    (reporter) => Array.isArray(reporter) && reporter[0] === 'html'
  )

  if (htmlReporterIndex !== -1) {
    (customizedConfig.reporter[htmlReporterIndex][1] as { outputFolder: string }).outputFolder = `${output}`
  }
  // console.log(customizedConfig)

  return customizedConfig
}
