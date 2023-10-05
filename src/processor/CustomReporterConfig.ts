import { Reporter, TestCase, TestError, TestResult, TestStep } from "@playwright/test/reporter";
const winston = require(`winston`);

const console = new winston.transports.Console();
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // - Write all logs with importance level of `info` or less than it
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
  ],
});

// Writes logs to console
logger.add(console);

export default class CustomReporterConfig implements Reporter {

  onTestBegin(test: TestCase): void {
    logger.info(`Test Case Started : ${test.title}`);
    console.log('test start')
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    logger.info(`Test Case Completed : ${test.title} Status : ${result.status}`);
    console.log('test end')
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === `test.step`) {
      logger.info(`Executing Step : ${step.title}`);
    }
    console.log('step')
  }

  onError(error: TestError): void {
    logger.error(error.message);
    console.log('error')
  }

}