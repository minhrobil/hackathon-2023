import { IsString } from 'class-validator';

export class PlaceShipDto {
  @IsString()
  readonly player1: string;

  @IsString()
  readonly player2: string;
}
