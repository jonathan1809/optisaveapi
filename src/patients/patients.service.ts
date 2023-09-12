import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { RestDto } from 'src/common/dto/rest.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<Patient>
  ) { }

  async create(createPatientDto: CreatePatientDto) {
    try {
      const patient = await this.patientModel.create(createPatientDto)
      return patient;
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(query: RestDto) {
    const [patients, patientsCount] = await Promise.all([
      this.patientModel.find(query.restQuery)
        .skip(query.skip)
        .limit(query.limit)
        .sort(query.sort),
      this.patientModel.countDocuments(query.restQuery)
    ])
    return { patientsCount, patients }
  }

  async findOne(id: ObjectId) {
    const patient = await this.patientModel.findById(id)
    return patient;
  }

  async update(id: ObjectId, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientModel.findByIdAndUpdate(id, updatePatientDto)
    return patient;
  }

  async remove(id: ObjectId) {
    const { deletedCount } = await this.patientModel.deleteOne({ _id: id })

    if (deletedCount === 0) {
      throw new NotFoundException(`Patient with id ${id} is not found`)
    }

    return;
  }

  async createMany(createPatientDto: CreatePatientDto[]) {
    const resp = await this.patientModel.insertMany(createPatientDto);
    return resp.length
  }
}
