
import { getPlaywrightConfig } from '@app/utils/get-playwright-config';
import { runCustomTests } from '@app/utils/test-running';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { RunSchemaDto } from './schema.dto';
import logger from '@app/utils/logger';

@Injectable()
export class SchemaService {

  async download(
    id: string,
    number: number,
    res: Response,
  ) {
    // Construct the file path based on the id and number.
    const filePath = `../../../../../records/record-${id}/step-${number}.json`; // Adjust the path accordingly.

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
    const config = getPlaywrightConfig(`../../../../../records/record-${id}/html-report`)
    try {
      await runCustomTests(json, config)
      // save new record into server
      // fs.rmSync(`../../../../../records/record-${id}`, { recursive: true });
    } catch (err) {
      throw new Error(err)
    }


  }
}