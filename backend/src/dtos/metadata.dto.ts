import { Properties } from '@/interfaces/metadata.interface';
import { IsNumber, IsString } from 'class-validator';

export class UploadMetadataDto {
  @IsNumber()
  public tokenId: number;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  public image: string;

  public properties: Properties;
}
