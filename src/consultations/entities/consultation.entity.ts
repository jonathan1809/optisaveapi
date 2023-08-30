import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId, Types } from "mongoose";

export type ConsultationDocument = HydratedDocument<Consultation>;

@Schema({ timestamps: true })
export class Consultation extends Document {
  @Prop({ type: () => Types.ObjectId, required: true })
  patientId: ObjectId;

  @Prop()
  reasonForConsultation: string;

  @Prop()
  interpupillaryDistance: string; // DIP

  @Prop()
  scVision: ScVision[];

  @Prop()
  currentPrescription: CurrentPrescription[];

  @Prop()
  finalPrescription: FinalPrescription[];

  @Prop()
  diagnosis: Diagnosis[];

  @Prop()
  treatmentObservations: string;

  @Prop()
  consultationDate: Date;
}

// AV SC
export class ScVision {
  @Prop()
  eye: string;
  @Prop()
  visualAcuityWithoutCorrection: string;
}

// RX EN USO
export class CurrentPrescription {
  @Prop()
  eye: string;
  @Prop()
  sphericalPower: number; // should be a decimal
  @Prop()
  cylinderPower: number; // should be a decimal
  @Prop()
  axis: number; // should be an decimal
  @Prop()
  nearAdditionPower?: number; // should be a decimal
  @Prop()
  visualAcuityWithCorrection?: string;
}

// RX FINAL
export class FinalPrescription {
  @Prop()
  eye: string;
  @Prop()
  sphericalPower: number; // should be a decimal
  @Prop()
  cylinderPower: number; // should be a decimal
  @Prop()
  axis: number; // should be an decimal
  @Prop()
  nearAdditionPower?: number; // should be a decimal
  @Prop()
  visualAcuityWithCorrection?: string;
}

// DX
export class Diagnosis {
  @Prop()
  eye: string;
  @Prop()
  refractive: string;
  @Prop()
  visualAcuity: string;
  @Prop()
  ocularHealth: string;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation)