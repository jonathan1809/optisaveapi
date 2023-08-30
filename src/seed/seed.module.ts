import { Module } from '@nestjs/common';
import { PatientsModule } from '../patients/patients.module';
import { ConsultationsModule } from '../consultations/consultations.module';
import { SeedCommand } from './seed.command';

@Module({
  imports: [PatientsModule, ConsultationsModule],
  providers: [SeedCommand],
})
export class SeedModule { }
