import { IsString } from 'class-validator';

export class HeaderDto {
  @IsString()
  readonly 'x-session-id': string;

  @IsString()
  readonly 'x-token': string;
}
