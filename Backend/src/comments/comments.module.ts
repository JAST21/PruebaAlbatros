import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentSchema, Comment } from './schemas/comment.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule { }
