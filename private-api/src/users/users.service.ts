import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findMostConsumedNutrient(id: number) {

    const entityManager = getManager();
    // const query = entityManager.query(`
    //   SELECT fn.nutrient_id AS nutri_id, SUM(fn.amount_per_serving * uf.servings_per_week) AS total_amount
    //   FROM food_nutrients AS fn 
    //   JOIN user_foods AS uf 
    //   ON uf.food_id = fn.food_id 
    //   WHERE uf.user_id = ? AND
    //     fn.amount_per_serving > 0
    //   GROUP BY fn.nutrient_id
    //   ORDER BY total_amount DESC
    //   LIMIT 1
    // `, [id]);
    const queryNutrients = entityManager.query(`
    SELECT n.id, n.name, n.unit_name AS unitName, res.total_amount AS weeklyAmount
    FROM (
      SELECT fn.nutrient_id AS nutri_id, SUM(fn.amount_per_serving * uf.servings_per_week) AS total_amount
      FROM food_nutrients AS fn 
      JOIN user_foods AS uf 
      ON uf.food_id = fn.food_id 
      WHERE uf.user_id = ? AND
        fn.amount_per_serving > 0
      GROUP BY fn.nutrient_id
      ORDER BY total_amount DESC
      LIMIT 1
    ) AS res
    JOIN nutrients AS n
    ON n.id = res.nutri_id
    `, [id]);
    
    return queryNutrients
  }

  findAll(skip = 0, take = 25) {
    return this.usersRepository.find({
      skip,
      take,
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOneOrFail(id)
    .catch(err => {
      console.log("ERR", err)
      if (err.name == 'EntityNotFound') {
        throw new HttpException(`User ID ${id} Not Found`, 404)
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update({ id }, updateUserDto);
    return this.usersRepository.findOneOrFail(id);
  }

  remove(id: number) {
    return this.usersRepository.delete({ id });
  }
}
