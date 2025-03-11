import { Field, ID, ObjectType } from '@nestjs/graphql';
import {ProductModel } from './product.model';

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [ProductModel], { nullable: true })
  products?: ProductModel[];
}