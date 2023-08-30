import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Consultation, ConsultationSchema } from './entities/consultation.entity';
import { ConsultationsService } from './consultations.service';
import { ConsultationsController } from './consultations.controller';

@Module({
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Consultation.name,
        schema: ConsultationSchema
      }
    ])
  ],
  exports: [
    ConsultationsService,
    MongooseModule
  ]
})
export class ConsultationsModule { }
