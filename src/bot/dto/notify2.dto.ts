import { IsArray } from 'class-validator';

export class Notify2Dto {
  @IsArray()
  coordinates: number[][];
}
