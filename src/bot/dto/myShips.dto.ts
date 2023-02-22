import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ShipType } from './invite.dto';
  
class Ship {
  @IsArray()
  readonly coordinates: number[][];

  @IsEnum(ShipType)
  readonly type: string;
}

export class MyShipsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Ship)
  readonly ships: Ship[] = new Array();
}
