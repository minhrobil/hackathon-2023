import { IsInt, IsString, IsArray, IsEnum, ValidateNested, ArrayMinSize, ArrayMaxSize, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ShipType } from './invite.dto';

enum StatusShot {
    HIT,
    MISS,
}


class Shot {
  @IsArray()
  readonly coordinate: number[];

  @IsEnum(StatusShot)
  readonly status: string;
}
  
class SunkShip {
  @IsArray()
  readonly coordinates: number[][];

  @IsEnum(ShipType)
  readonly type: string;
}

export class NotifyDto {
  @IsString()
  readonly playerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Shot)
  readonly shots: Shot[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SunkShip)
  @IsOptional()
  readonly sunkShips: SunkShip[];
}
