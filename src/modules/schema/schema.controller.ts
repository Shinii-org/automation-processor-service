import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Res
} from '@nestjs/common';


import { Response } from 'express';
import { SchemaService } from './schema.service';
import { RunSchemaDto } from './schema.dto';

@Controller('schemas')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) { }

  @Get(':id/:number/download')
  download(
    @Param('id') id: string,
    @Param('number') number: number,
    @Res() res: Response,
  ) {
    this.schemaService.download(id, number, res)
  }

  @Patch('/run/:id')
  run(
    @Param('id') id: string,
    @Body() dto: RunSchemaDto) {
    this.schemaService.run(id, dto)
  }
}
