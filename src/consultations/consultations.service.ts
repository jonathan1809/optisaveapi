import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Consultation } from './entities/consultation.entity';
import { RestDto } from 'src/common/dto/rest.dto';

@Injectable()
export class ConsultationsService {

  constructor(
    @InjectModel(Consultation.name)
    private readonly consultationModel: Model<Consultation>
  ) { }

  create(createConsultationDto: CreateConsultationDto) {
    return 'This action adds a new consultation';
  }

  async findConsultations(query: RestDto) {
    const [consultationsCount, consultations] = await Promise.all([
      this.consultationModel.find(query.restQuery)
        .skip(query.skip)
        .limit(query.limit)
        .sort(query.sort),
      this.consultationModel.countDocuments(query.restQuery)
    ])
    return { consultationsCount, consultations }
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

  async createMany(createConsultationDto: CreateConsultationDto[]) {
    const resp = await this.consultationModel.insertMany(createConsultationDto);
    return resp.length
  }
}
