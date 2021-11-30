import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  name: string;

  @IsString()
  owner: string;
}

export class CreateMessageDto {
  @IsString()
  id: string;

  @IsString()
  message: string;

  @IsString()
  username: string;
}
