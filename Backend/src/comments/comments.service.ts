import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/CreateCommentDto.dto';

@Injectable()
export class CommentsService {

    constructor(
        @InjectModel(Comment.name)
        private readonly commentModel: Model<Comment>,
    ) { }

    // crea un nuevo comentario
    async createComment(createCommentDto: CreateCommentDto) {
        const createdComment = await this.commentModel.create(createCommentDto);
        return createdComment;
    }

    // obtiene todos los comentarios de un post por su postId
    async findByPostId(postId: string) {
        return this.commentModel
            .find({ postId: new Types.ObjectId(postId) })
            .sort({ createdAt: -1 })
            .exec();
    }

    // elimina un comentario por su id
    async remove(id: string) {
        const deletedComment = await this.commentModel.findByIdAndDelete(id).exec();
        if (!deletedComment) {
            throw new NotFoundException(`Comentario no encontrado ${id}`);
        }
        return deletedComment;
    }

}