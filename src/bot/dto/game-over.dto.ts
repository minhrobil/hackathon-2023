import { IsString, IsOptional } from 'class-validator';

export class GameOverDto {
  @IsString()
  readonly winner: string;

  @IsString()
  readonly loser: string;

  @IsString()
  @IsOptional()
  readonly statistics: string;
}
