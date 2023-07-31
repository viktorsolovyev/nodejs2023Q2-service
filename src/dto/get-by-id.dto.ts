import { IsUUID } from 'class-validator';

export class UUIDv4 {
  @IsUUID(4)
  id: string;
}
