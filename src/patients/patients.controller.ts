import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { MailParams } from '../common/mail/types/mail-adapter.type';
import { ValidateMongoIdPipe } from '../common/pipes/validate-mongo-id/validate-mongo-id.pipe';
import { MailService } from '../common/mail/mail.service';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly mailService: MailService
  ) { }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateMongoIdPipe) id: ObjectId) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ValidateMongoIdPipe) id: ObjectId, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdPipe) id: ObjectId) {
    console.log('Delete ', id)
    return this.patientsService.remove(id);
  }

  @Get('send/mail/:url')
  async sendNotification(@Param('url') id: string) {
    const patients = await this.patientsService.findAll()
    const mailOptions: MailParams = {
      to: "jonathanmedina1809@hotmail.com",
      subject: "testing email",
      template: "test",
      text: `"This is the text message" ${patients.length}`,
      context: {
        name: patients.length,
        url: id
      }
    }
    try {
      await this.mailService.sendMail(mailOptions)
    } catch (error) {
      throw new ForbiddenException(error, 'Email.NotSent');
    }
  }
}
