import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export type Sort = { [key: string]: 1 | -1 }

export type RestQuery = { [key: string]: unknown }

export class RestDto {

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip: number

  @IsOptional()
  sort: Sort;

  @IsOptional()
  restQuery: RestQuery;
}

