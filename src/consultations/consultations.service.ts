import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Consultation } from './entities/consultation.entity';

@Injectable()
export class ConsultationsService {

  constructor(
    @InjectModel(Consultation.name)
    private readonly patientModel: Model<Consultation>
  ) { }

  create(createConsultationDto: CreateConsultationDto) {
    return 'This action adds a new consultation';
  }

  findAll() {
    return `This action returns all consultations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultation`;
  }

  update(id: number, updateConsultationDto: UpdateConsultationDto) {
    return `This action updates a #${id} consultation`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultation`;
  }

  async createMany(createConsultationDto: any[]) {
    const resp = await this.patientModel.insertMany(createConsultationDto);
    return resp.length
  }
}
