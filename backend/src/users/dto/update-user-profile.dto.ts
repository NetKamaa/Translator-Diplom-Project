import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  nickname?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
