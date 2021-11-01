import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

const mockRepository = jest.fn(() => ({
  id: 1,
  description: 'test',
  publicationDate: 'date',
}));

describe('FoodsController', () => {
  let controller: FoodsController;
  let service: FoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodsController],
      providers: [
        FoodsService,
        { provide: getRepositoryToken(Food), useClass: mockRepository },
      ],
    }).compile();

    service = module.get<FoodsService>(FoodsService);
    controller = module.get<FoodsController>(FoodsController);
  });

  describe('create', () => {
    it('create food', async () => {
      const dto = new CreateFoodDto;
      let result;
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(dto)).toBe(result);
    })
  })

  describe('findAll', () => {
    it('should return array of foods', async () => {
      const search = 'test'
      let result;
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll(search, 1, 0)).toBe(result);
    })
  })

  describe('findOne', () => {
    it('should return food', async () => {
      let result;
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(1)).toBe(result);
    })
  });

  describe('update', () => {
    it('update food', async () => {
      const dto = new UpdateFoodDto;
      const userId = 1;
      let result;
      jest.spyOn(service, 'update').mockImplementation(async () => result);
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);
      await controller.update(userId, dto)

      expect(await controller.findOne(userId)).toBe(result);
    })
  })

  describe('remove', () => {
    it('delete food', async () => {
      const userId = 1;
      let result;
      jest.spyOn(service, 'remove').mockImplementation(async () => result);
  
      expect(await controller.remove(userId)).toBe(`${userId} Deleted Successfully`);
    })
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
