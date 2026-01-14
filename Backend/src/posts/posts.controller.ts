import { Controller, Body, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePostDto.dto';
import { UpdatePostDto } from './dto/UpdatePostDto.dto';
import { ApiResponse } from 'src/common/responses/ApiResponse';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    //endpoint para crear un nuevo post
    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return ApiResponse.success(this.postsService.create(createPostDto), 'Post creado exitosamente');
    }

    //endpoint para obtener todos los posts
    @Get()
    findAll() {
        return ApiResponse.success(this.postsService.findAll(), 'Posts obtenidos exitosamente');
    }

    //endpoint para obtener un post por su id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return ApiResponse.success(this.postsService.findOne(id), 'Post obtenido exitosamente');
    }

    //endpoint para actualizar un post por su id
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdatePostDto,
    ) {
        return ApiResponse.success(this.postsService.update(id, dto), 'Post actualizado exitosamente');
    }

    //endpoint para eliminar un post por su id
    @Delete(':id')
    remove(@Param('id') id: string) {
        return ApiResponse.success(this.postsService.remove(id), 'Post eliminado exitosamente');
    }

    // endpoint para crear multiples posts
    @Post('bulk')
    bulkCreate(@Body() posts: CreatePostDto[]) {
        return ApiResponse.success(this.postsService.bulkCreate(posts), 'Posts creados exitosamente');
    }   

}