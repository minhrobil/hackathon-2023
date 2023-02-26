import { IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ShipType } from './invite.dto';

class Ship {
  @IsArray()
  coordinates: number[][];

  @IsEnum(ShipType)
  readonly type: string;

  @IsOptional()
  status: string;
}

export class MyShipsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Ship)
  readonly ships: Ship[] = [];
}
