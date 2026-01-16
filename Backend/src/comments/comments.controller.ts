import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/CreateCommentDto.dto';
import { ApiResponse } from 'src/common/responses/ApiResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) { }


    //endpoint para crear un comentario
    @Post()
    async createComment(@Body() createCommentDto: CreateCommentDto) {
        const comment = await this.commentsService.createComment(createCommentDto);

        return ApiResponse.success(
            comment, 'Comentario creado exitosamente'
        );
    }

    //endpoint para obtener comentarios por postId
    @Get(':postId')
    async findCommentsByPostId(@Param('postId') postId: string) {
        const comments = await this.commentsService.findByPostId(postId);
        return ApiResponse.success(comments, 'Comentarios obtenidos exitosamente');
    }

    //endpoint para eliminar un comentario por id
    @Delete(':id')
    async deleteComment(@Param('id') id: string) {
        const deletedComment = await this.commentsService.remove(id);
        return ApiResponse.success(deletedComment, 'Comentario eliminado exitosamente');
    }


}
