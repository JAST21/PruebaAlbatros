import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPostsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        { provide: PostsService, useValue: mockPostsService },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create() -> should call service.create and wrap response', async () => {
    const dto = {
      title: 'Post test',
      body: 'Contenido',
      author: 'Tester',
    };

    const result = { ...dto, _id: '123' };
    mockPostsService.create.mockResolvedValue(result);

    const response = await controller.create(dto as any);

    expect(service.create).toHaveBeenCalledWith(dto);

    //controller envuelve con ApiResponse
    expect(response).toEqual({
      success: true,
      message: 'Post creado exitosamente',
      data: result,
    });
  });
});
