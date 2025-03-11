import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import ProductModel from './product.model';
import { ProductParams } from './products.controller';

@Resolver()
export class ProductsResolver {
  constructor(private productService: ProductsService) {}
  @Query(() => [ProductModel])
  async getProduct() {
    return this.productService.getAll();
  }

  @Query(() => ProductModel)
  async getoneProduct(@Args('id') id: number) {
    return this.productService.getOne(id);
  }

  @Mutation(() => ProductModel)
  async createProduct(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('image') image: string,
    @Args('price') price: string,
  ) {
    const params = {
      name,
      description,
      image,
      price,
    };
    return this.productService.create(params);
  }

  @Mutation(() => ProductModel)
  async updateProduct(
    @Args('id') id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('image', { nullable: true }) image?: string,
    @Args('price', { nullable: true }) price?: string,
  ) {
    const existingProduct = await this.productService.getOne(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }
    const updateParams: ProductParams = {
      name: name ?? existingProduct.name,
      description: description ?? existingProduct.description,
      image: image ?? existingProduct.image,
      price: price ?? existingProduct.price,
    };
    return this.productService.update(updateParams, id);
  }

  @Mutation(() => ProductModel)
  async deleteProduct(@Args('id') id: number) {
    return this.productService.delete(id);
  }
}
