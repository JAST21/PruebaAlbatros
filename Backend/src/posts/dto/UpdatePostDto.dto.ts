import {PartialType} from '@nestjs/mapped-types';
import {CreatePostDto} from './CreatePostDto.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}