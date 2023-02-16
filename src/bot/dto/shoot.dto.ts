import { IsInt } from 'class-validator';

export class ShootDto {
  @IsInt()
  readonly turn: number;

  @IsInt()
  readonly maxShots: number;
}
