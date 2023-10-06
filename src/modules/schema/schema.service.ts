
import { getPlaywrightConfig } from '@app/utils/get-playwright-config';
import { runCustomTests } from '@app/utils/test-running';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { RunSchemaDto } from './schema.dto';
import { exec, ExecException } from 'child_process';

import * as APP_CONFIG from '../../app.config'
import path from 'path';

@Injectable()
export class SchemaService {

  async download(
    id: string,
    number: number,
    res: Response,
  ) {
    // Construct the file path based on the id and number.

    const filePath = `${APP_CONFIG.APP.ROOT_PATH}/records/record-${id}/step-${number}.json`; // Adjust the path accordingly.

    // Check if the file exists.
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    try {
      // Read the JSON file.
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContents);

      // Send the JSON data in the response.
      res.json(jsonData);
    } catch (err) {
      return res.status(500).send('Error reading JSON file');
    }
  }


  async run(
    id: string,
    dto: RunSchemaDto) {
    const json = JSON.parse(dto.script);
    json.testCase.id = id
    const directoryPath = `${APP_CONFIG.APP.ROOT_PATH}/records/record-${id}`;
    const filePath = path.join(directoryPath, `${id}.json`)
    process.env.JSON_FILE_PATH = filePath
    const command = `yarn test:automation`
    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err}`);
      } else {
        fs.mkdir(`${directoryPath}/html-report`, { recursive: true }, (err) => {
          if (err) {
            console.error(`Error creating directory: ${err}`);
          }
        })
        console.log(`Directory "${directoryPath}" created successfully.`);
        fs.writeFile(filePath, JSON.stringify(json, null, 2), (writeErr) => {
          if (writeErr) {
            console.error(`Error writing to JSON file: ${writeErr}`);
          } else {
            console.log(`Data has been written to ${filePath}`);
          }
        });
      }
    });
    const childProcess = exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`Error running command: ${error.message}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

    // Listen for the child process to exit
    childProcess.on('exit', (code: number | null) => {
      if (code !== null) {
        console.log(`Child process exited with code ${code}`);
      }
    });
    // const config = getPlaywrightConfig(`${directoryPath}/html-report`)

    // try {
    //   await runCustomTests(json, config)
    //   // save new record into server
    //   // fs.rmSync(`../../../../../records/record-${id}`, { recursive: true });
    // } catch (err) {
    //   throw new Error(err)
    // }


  }
}