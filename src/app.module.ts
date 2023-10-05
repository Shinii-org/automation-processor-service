import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios'
import { SchemaModule } from './modules/schema/schema.module'


@Module({
  imports: [
    HttpModule,
    SchemaModule,
  ],
  providers: [JwtService]
})
export class AppModule { }
