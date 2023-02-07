// repository - дата-слой (DAL)
// данные из базы MongoDB

import {ProductType} from "../routes/products-router";
import {client} from "./db";

export const productsRepository = {
    async findProducts(searchTitle: string | null): Promise<ProductType[]> {
        if (searchTitle) {
            return client.db('shop')
                .collection<ProductType>('products')
                .find({ title: {$regex: searchTitle} })
                .toArray()

            // return __products.filter(p => p.title.includes(searchTitle))
        } else {
            return client.db('shop')
                .collection<ProductType>('products')
                .find({ })
                .toArray()

            // return __products
        }
    },
    async findProductById(searchId: number) {
        const product: ProductType | null = await client.db('shop')
            .collection<ProductType>('products')
            .findOne({ id: searchId })

        if (product) {
            return product
            // return __products.find(el => el.id === +searchId)
        } else {
            return null
        }
    },
    async createProduct(productTitle: string): Promise<ProductType> {
        const newProduct = { id: +(new Date()), title: productTitle }

        const result = await client.db('shop')
            .collection<ProductType>('products')
            .insertOne(newProduct)

        return newProduct
        // __products.push(newProduct)
    },
    async deleteProduct(productId: number): Promise<boolean> {
        const result = await client.db('shop')
            .collection<ProductType>('products')
            .deleteOne({id: productId})

        return result.deletedCount === 1

        // for (let i = 0; i < __products.length; i++) {
        //     if (__products[i].id === +productId) {
        //         __products.splice(i,1)
        //         return true
        //     }
        // }
        // return false
    },
    async updateProduct(productId: number, productTitle: string): Promise<boolean> {
        const result = await client.db('shop')
            .collection<ProductType>('products')
            .updateOne({id: productId}, {$set: {title: productTitle}})

        return result.matchedCount === 1

        // let product = __products.find(el => el.id === +productId)
        //
        // if(product) {
        //     product.title = productTitle
        //     return true
        // } else {
        //     return false
        // }
    }
}