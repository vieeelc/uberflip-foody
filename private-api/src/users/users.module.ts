import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserFoodsService } from 'src/user-foods/user-foods.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserFood } from 'src/user-foods/entities/user-food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserFood])
  ],
  controllers: [UsersController],
  providers: [UsersService, UserFoodsService],
})
export class UsersModule {}
