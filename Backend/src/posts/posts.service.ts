import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/CreatePostDto.dto';
@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name)
    private postModel: Model<Post>) { }

    // crea un nuevo post
    async create(createPostDto: CreatePostDto) {
        const createdPost = await this.postModel.create(createPostDto);
        return createdPost;
    }

    // obtiene todos los posts ordenados por fecha de creación en orden descendente
    async findAll() {
        const posts = await this.postModel.find().sort({ createdAt: -1 }).exec();
        return posts;
    }

    // obtiene un post por su id
    async findOne(id: string) {
        const post = await this.postModel.findById(id).exec();

        if (!post) {
            throw new NotFoundException(`Post no encontrado ${id}`);
        }

        return post;
    }

    // actualiza un post por su id
    async update(id: string, updatePostDto: Partial<CreatePostDto>) {
        const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();

        if (!updatedPost) {
            throw new NotFoundException(`Post no encontrado ${id}`);
        }
        return updatedPost;
    }

    // elimina un post por su id
    async remove(id: string) {
        const deletedPost = await this.postModel.findByIdAndDelete(id).exec();
        if (!deletedPost) {
            throw new NotFoundException(`Post no encontrado ${id}`);
        }
        return deletedPost;
    }

    // crea multiples posts
    async bulkCreate(createPostsDto: CreatePostDto[]) {
        const createdPosts = await this.postModel.insertMany(createPostsDto);
        return createdPosts;
    }
}