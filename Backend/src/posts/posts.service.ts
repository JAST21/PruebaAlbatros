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

    async findAllPaginated(search = '', page = 1, limit = 10) {
        const safePage = Math.max(1, page);
        const safeLimit = Math.min(50, Math.max(1, limit));
        const skip = (safePage - 1) * safeLimit;

        const filter = search
            ? {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { body: { $regex: search, $options: 'i' } },
                    { author: { $regex: search, $options: 'i' } },
                ],
            }
            : {};

        const [items, totalItems] = await Promise.all([
            this.postModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(safeLimit)
                .exec(),
            this.postModel.countDocuments(filter).exec(),
        ]);

        const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));

        return {
            items,
            meta: {
                page: safePage,
                limit: safeLimit,
                totalItems,
                totalPages,
            },
        };
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