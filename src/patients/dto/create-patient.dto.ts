import { IsString, IsOptional, Length } from "class-validator"

class PatientAddressDTO {

  @IsString()
  city!: string

  @IsString()
  country!: string

  @IsString()
  line1!: string

  @IsString()
  line2?: string

  @IsString()
  postalCode!: string

  @IsString()
  state!: string
}

export class CreatePatientDto {

  @IsString()
  name: string

  @IsString()
  surname: string

  @IsString()
  dateOfBirth!: Date

  @IsString()
  @Length(1, 1)
  gender: string

  @IsOptional()
  address: PatientAddressDTO

  @IsOptional()
  @IsString()
  @Length(12, 12)
  phone: string

}
