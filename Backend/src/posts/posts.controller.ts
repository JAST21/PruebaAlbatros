import { Controller, Body, Get, Post, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePostDto.dto';
import { UpdatePostDto } from './dto/UpdatePostDto.dto';
import { ApiResponse } from 'src/common/responses/ApiResponse';

@UseGuards()
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    //endpoint para crear un nuevo post
    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        return ApiResponse.success(await this.postsService.create(createPostDto), 'Post creado exitosamente');
    }

    //endpoint para obtener todos los posts
    @Get()
    async findAll() {
        return ApiResponse.success(await this.postsService.findAll(), 'Posts obtenidos exitosamente');
    }

    //endpoint para obtener un post por su id
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return ApiResponse.success(await this.postsService.findOne(id), 'Post obtenido exitosamente');
    }

    //endpoint para actualizar un post por su id
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdatePostDto,
    ) {
        return ApiResponse.success(await this.postsService.update(id, dto), 'Post actualizado exitosamente');
    }

    //endpoint para eliminar un post por su id
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return ApiResponse.success(await this.postsService.remove(id), 'Post eliminado exitosamente');
    }

    // endpoint para crear multiples posts
    @Post('bulk')
    async bulkCreate(@Body() posts: CreatePostDto[]) {
        return ApiResponse.success(await this.postsService.bulkCreate(posts), 'Posts creados exitosamente');
    }

}