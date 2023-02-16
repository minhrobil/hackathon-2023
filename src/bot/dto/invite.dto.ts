import { IsInt, IsString, IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum ShipType {
    CV,
    BB,
    OR,
    CA,
    DD
}

export class ShipDto {
    @IsEnum(ShipType)
    readonly type: string;
  
    @IsInt()
    readonly quantity: number;
}
  

export class InviteDto {
  @IsInt()
  readonly boardWidth: number;

  @IsInt()
  readonly boardHeight: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShipDto)
  readonly ships: ShipDto[];
}
