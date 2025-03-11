import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class ProductModel {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field()
  price: string;
}
