import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  Query,
  HttpException,
} from '@nestjs/common';
import { UserFoodsService } from './user-foods.service';
import { PaginationHelper } from '../../libs/pagination-helper';
import { AddUserFoodDto } from './dto/add-user-food.dto';

@Controller('users/:userId/foods')
export class UserFoodsController {
  constructor(private readonly userFoodsService: UserFoodsService) {}

  @Get()
  foods(
    @Param('userId') userId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const { skip, take } = PaginationHelper.getSkipTake(page, limit);
    return this.userFoodsService.findFoods(userId, skip, take)
      .catch(err => {
        if (err.name = 'EntityNotFound') {
          throw new HttpException(`User ID ${userId} Not Found`, 404)
        }
      });
  }

  @Get(':foodId')
  food(@Param('userId') userId: number, @Param('foodId') foodId: number) {
    return this.userFoodsService.findFood(userId, foodId);
  }

  @Put(':foodId')
  async addFood(
    @Param('userId') userId: number,
    @Param('foodId') foodId: number,
    @Body() addUserFoodDto: AddUserFoodDto,
  ) {
    await this.userFoodsService.addFood(userId, foodId, addUserFoodDto);
  }

  @Delete(':foodId')
  @HttpCode(204)
  async deleteFood(
    @Param('userId') userId: number,
    @Param('foodId') foodId: number,
  ) {
    await this.userFoodsService.deleteFood(userId, foodId);
  }
}
