import { writeFileSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Command } from 'nestjs-command';
import * as xlsx from 'xlsx';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { Patient } from '../patients/entities/patient.entity';
import { Consultation } from '../consultations/entities/consultation.entity';

@Injectable()
export class SeedCommand {
  private file: xlsx.WorkBook
  private dictionaryXLSX = {
    NOMBRE: "NOMBRE",
    EDAD: "EDAD",
    SEXO: "SEXO",
    DOMICILIO: "DOMICILIO",
    TELEFONO: "TELEFONO",
    MOTIVO: "MOTIVO",
    DIP: "DIP",
    ojo: "ojo",
    SC: "SC",
    ESF: "ESF",
    CIL: "CIL",
    EJE: "EJE",
    ADD: "ADD",
    CC: "CC",
    ESF_1: "ESF_1",
    CIL_1: "CIL_1",
    EJE_1: "EJE_1",
    ADD_1: "ADD_1",
    CC_1: "CC_1",
    REFRACTIVO: "REFRACTIVO"
  }

  private monthsInXlsx = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio"];
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<Patient>,
    @InjectModel(Consultation.name)
    private readonly consultationModel: Model<Consultation>
  ) { }

  @Command({
    command: 'create:patients',
    describe: 'create patients and consultations',
  })
  async createPatientsAndConsultationsFromXLSX() {
    await this.patientModel.deleteMany({})
    await this.consultationModel.deleteMany({})
    let countElementsWithName = 0
    const sheetData = this.getJsonFromFileXLSX('./files/CONCENTRADO2019.xlsx');
    console.log("start creating patients")
    const patients: Patient[] = [];
    const consultations: Consultation[] = [];
    let consultationData: Consultation = null;
    sheetData.forEach((element) => {
      if (element['NOMBRE']) {
        if (!this.monthsInXlsx.includes(element['NOMBRE'].toLowerCase())) {
          countElementsWithName++
          const age = this.generateAge(element[this.dictionaryXLSX.EDAD])
          const { name, surname } = this.generateNameAndSurname(element[this.dictionaryXLSX.NOMBRE])

          let patient: Patient = new this.patientModel({
            name: name,
            surname: surname,
            age: age,
            gender: element[this.dictionaryXLSX.SEXO],
            address: {
              line1: element[this.dictionaryXLSX.DOMICILIO]
            },
            dateOfBirth: faker.date.birthdate({
              min: age, max: age, mode: "age"
            }),
            phone: element[this.dictionaryXLSX.TELEFONO],
            consultations: []
          });

          if (!this.isPatientInArray(patients, patient)) {
            patients.push(patient);
          } else {
            patient = this.getPatientByNameAndAge(patients, patient);
          }

          consultationData = new this.consultationModel({
            patientId: patient._id,
            reasonForConsultation: element[this.dictionaryXLSX.MOTIVO] ?? "",
            interpupillaryDistance: element[this.dictionaryXLSX.DIP] ?? "",
            treatmentObservations: "",
            consultationDate: faker.date.recent(),
            scVision: [{
              eye: "R",
              visualAcuityWithoutCorrection: element[this.dictionaryXLSX.SC] ?? ""
            }],
            currentPrescription: [{
              eye: "R",
              sphericalPower: element[this.dictionaryXLSX.ESF] ?? 0.0,
              cylinderPower: element[this.dictionaryXLSX.CIL] ?? 0.0,
              axis: element[this.dictionaryXLSX.EJE] ?? 0.0,
              nearAdditionPower: element[this.dictionaryXLSX.ADD] ?? 0.0,
              visualAcuityWithCorrection: element[this.dictionaryXLSX.CC] ?? "0/0",
            }],
            finalPrescription: [{
              eye: "R",
              sphericalPower: element[this.dictionaryXLSX.ESF_1] ?? 0.0,
              cylinderPower: element[this.dictionaryXLSX.CIL_1] ?? 0.0,
              axis: element[this.dictionaryXLSX.EJE_1] ?? 0.0,
              nearAdditionPower: element[this.dictionaryXLSX.ADD_1] ?? 0.0,
              visualAcuityWithCorrection: element[this.dictionaryXLSX.CC_1] ?? "0/0",
            }],
            diagnosis: [{
              eye: "R",
              refractive: element[this.dictionaryXLSX.REFRACTIVO] ?? "",
              visualAcuity: "",
              ocularHealth: "",
            }]
          })
          patient.consultations.push(consultationData._id)
          consultations.push(consultationData)
        }
      } else {
        if (consultationData) {
          consultationData.scVision.push({
            eye: "L",
            visualAcuityWithoutCorrection: element[this.dictionaryXLSX.SC] ?? ""
          })

          consultationData.currentPrescription.push({
            eye: "L",
            sphericalPower: element[this.dictionaryXLSX.ESF] ?? 0.0,
            cylinderPower: element[this.dictionaryXLSX.CIL] ?? 0.0,
            axis: element[this.dictionaryXLSX.EJE] ?? 0.0,
            nearAdditionPower: element[this.dictionaryXLSX.ADD] ?? 0.0,
            visualAcuityWithCorrection: element[this.dictionaryXLSX.CC] ?? "0/0",
          })

          consultationData.finalPrescription.push({
            eye: "L",
            sphericalPower: element[this.dictionaryXLSX.ESF_1] ?? 0.0,
            cylinderPower: element[this.dictionaryXLSX.CIL_1] ?? 0.0,
            axis: element[this.dictionaryXLSX.EJE_1] ?? 0.0,
            nearAdditionPower: element[this.dictionaryXLSX.ADD_1] ?? 0.0,
            visualAcuityWithCorrection: element[this.dictionaryXLSX.CC_1] ?? "0/0",
          })

          consultationData.diagnosis.push({
            eye: "L",
            refractive: element[this.dictionaryXLSX.REFRACTIVO] ?? "",
            visualAcuity: "",
            ocularHealth: "",
          })
          // const copyConsultation = { ...consultationData } as Consultation
          // consultations.push(copyConsultation)
          // consultationData = null
        }
      }
    })
    console.log("Total elements with Name:" + countElementsWithName)
    await this.patientModel.insertMany(patients);
    await this.consultationModel.insertMany(consultations);
  }

  private getPatientByNameAndAge(patients: Patient[], newPatient: Patient) {
    return patients.find((patient) => {
      return patient.name === newPatient.name &&
        patient.age === newPatient.age
    })
  }

  private isPatientInArray(patients: Patient[], newPatient: Patient) {
    const patient = this.getPatientByNameAndAge(patients, newPatient)
    if (patient) {
      console.log(`Patient with name ${patient.name} and age ${patient.age} already exist`)
      return true
    }
    return false;
  }
  private generateNameAndSurname(nameInFile) {
    const fullName: string[] = nameInFile ?
      nameInFile.trim().split(" ") :
      []
    let name = "not exist"
    let surname = "not exist"
    switch (fullName.length) {
      case 1:
        name = fullName[0]
        break;
      case 2:
        name = fullName[0]
        surname = fullName[1]
        break;
      case 3:
        name = fullName[0]
        surname = `${fullName[1]} ${fullName[2]}`
        break;
      case 4:
        name = `${fullName[0]} ${fullName[1]}`
        surname = `${fullName[2]} ${fullName[3]}`
        break;
      default:
        name = fullName.join(" ")
        break;
    }
    return { name: name.toLowerCase().trim(), surname: surname.toLowerCase().trim() }
  }

  private generateAge(ageInFile: string | undefined) {
    if (ageInFile) {
      if (isNaN(+ageInFile)) {
        const [age,] = ageInFile.split(" ")
        const years = Math.floor(+age / 12);
        const months = (+age % 12) / 10;
        return years + months
      } else {
        return +ageInFile
      }
    } else {
      return faker.number.int({ min: 0.1, max: 100 })
    }
  }

  private getJsonFromFileXLSX(fileName) {
    try {
      this.file = xlsx.readFile(fileName)
      const sheetName = this.file.SheetNames[0];
      return xlsx.utils.sheet_to_json(this.file.Sheets[sheetName]);
    } catch (error) {
      console.log("Something went wrong reading the file");
      console.error(error);
    }
  }
  private convertJsonToFile(json: unknown) {
    const jsonContent = JSON.stringify(json);
    try {
      writeFileSync("./files/output.json", jsonContent, 'utf8');
      console.log("File saved")
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
}
