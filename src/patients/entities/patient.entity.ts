import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from "mongoose";

export type PatientDocument = HydratedDocument<Patient>;

export class PatientAddress {
  @Prop()
  city?: string

  @Prop()
  country?: string

  @Prop()
  line1!: string

  @Prop()
  line2?: string

  @Prop()
  postalCode?: string

  @Prop()
  state?: string
}

@Schema({ timestamps: true })
export class Patient extends Document {
  @Prop({ required: true })
  name!: string

  @Prop({ required: true })
  surname!: string

  @Prop()
  age?: number

  @Prop({ required: true })
  dateOfBirth!: Date

  @Prop()
  gender?: string

  @Prop()
  address?: PatientAddress

  @Prop()
  phone?: string

  @Prop({ type: () => Types.ObjectId, ref: 'Consultation', required: true })
  consultations!: Types.ObjectId[]
}

export const PatientSchema = SchemaFactory.createForClass(Patient)