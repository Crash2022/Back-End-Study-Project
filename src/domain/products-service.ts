import {ProductType} from '../repositories/db';
import {productsRepository} from '../repositories/products-db.repository';

export const productsService = {
    async findProducts(searchTitle: string | null | undefined): Promise<ProductType[]> {
        return productsRepository.findProducts(searchTitle)
    },
    async findProductById(searchId: number) {
        return productsRepository.findProductById(searchId)
    },
    async createProduct(productTitle: string): Promise<ProductType> {
        const newProduct = { id: +(new Date()), title: productTitle }
        return await productsRepository.createProduct(newProduct)
    },
    async deleteProduct(productId: number): Promise<boolean> {
        return await productsRepository.deleteProduct(productId)
    },
    async updateProduct(productId: number, productTitle: string): Promise<boolean> {
        return await productsRepository.updateProduct(productId, productTitle)
    }
}
