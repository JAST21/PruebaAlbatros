import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { Post } from './schemas/post.schema';

describe('PostsService', () => {
  let service: PostsService;

  const mockPostModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken(Post.name),
          useValue: mockPostModel,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() -> should create a post', async () => {
    const dto = {
      title: 'Test post',
      body: 'Test body',
      author: 'Tester',
    };

    const createdPost = { ...dto, _id: '123' };
    mockPostModel.create.mockResolvedValue(createdPost);

    const result = await service.create(dto as any);

    expect(mockPostModel.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(createdPost);
  });
});
