import { FoodNutrient } from '../../food-nutrients/entities/food-nutrient.entity';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'nutrients' })
export class Nutrient extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { length: 255, name: 'name' })
  name: string;

  @Column('varchar', { length: 255, name: 'unit_name' })
  unitName: string;

  @Column('int', { name: 'rank' })
  rank: number;

  @Column('decimal', { precision: 6, scale: 1, name: 'nutrient_code' })
  nutrientCode!: number;

  @ManyToOne(() => FoodNutrient, (foodNutrient) => foodNutrient.nutrientId)
  foodNutrients: FoodNutrient[];
}
