import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNutrientDto } from './dto/create-nutrient.dto';
import { UpdateNutrientDto } from './dto/update-nutrient.dto';
import { Nutrient } from './entities/nutrient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NutrientsService {
  constructor(
    @InjectRepository(Nutrient)
    private nutrientsRepository: Repository<Nutrient>
  ) {}

  create(createNutrientDto: CreateNutrientDto) {
    return 'This action adds a new nutrient';
  }

  findAll() {
    return this.nutrientsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} nutrient`;
  }

  update(id: number, updateNutrientDto: UpdateNutrientDto) {
    return `This action updates a #${id} nutrient`;
  }

  remove(id: number) {
    return `This action removes a #${id} nutrient`;
  }
}
