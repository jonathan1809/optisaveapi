import { Module } from '@nestjs/common';
import { ValidateMongoIdPipe } from './pipes/validate-mongo-id/validate-mongo-id.pipe';
import { HttpRequestAdapter } from './adapters/http-request.adapter';

@Module({
  providers: [ValidateMongoIdPipe, HttpRequestAdapter],
  exports: [HttpRequestAdapter]
})
export class CommonModule { }
