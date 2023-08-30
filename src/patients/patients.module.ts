import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './entities/patient.entity';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Patient.name,
        schema: PatientSchema
      }
    ])
  ],
  exports: [
    PatientsService,
    MongooseModule
  ]
})
export class PatientsModule { }
