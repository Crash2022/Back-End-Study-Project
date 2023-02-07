// repository - дата-слой (DAL)
// данные из базы MongoDB

import {productsCollection, ProductType} from './db';

export const productsRepository = {
    async findProducts(searchTitle: string | null | undefined): Promise<ProductType[]> {
        const filter: any = {}

        if (searchTitle) {
           filter.title = {$regex: searchTitle}
        }
        return productsCollection.find(filter).toArray()

        // другой вариант записи
        // if (searchTitle) {
        //     return productsCollection.find({ title: {$regex: searchTitle} }).toArray()
        //
        //     // return __products.filter(p => p.title.includes(searchTitle))
        // } else {
        //     return productsCollection.find({ }).toArray()
        //     // return __products
        // }
    },
    async findProductById(searchId: number) {
        const product: ProductType | null = await productsCollection.findOne({ id: searchId })

        if (product) {
            return product
            // return __products.find(el => el.id === +searchId)
        } else {
            return null
        }
    },
    async createProduct(newProduct: ProductType): Promise<ProductType> {
    // async createProduct(productTitle: string): Promise<ProductType> {
        // было до бизнес-слоя (products-service)
        // const newProduct = { id: +(new Date()), title: productTitle }
        const result = await productsCollection.insertOne(newProduct)
        return newProduct
        // __products.push(newProduct)
    },
    async deleteProduct(productId: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id: productId})
        return result.deletedCount === 1

        // вариант до рефакторинга
        // for (let i = 0; i < __products.length; i++) {
        //     if (__products[i].id === +productId) {
        //         __products.splice(i,1)
        //         return true
        //     }
        // }
        // return false
    },
    async updateProduct(productId: number, productTitle: string): Promise<boolean> {
        const result = await productsCollection.updateOne({id: productId}, {$set: {title: productTitle}})
        return result.matchedCount === 1

        // вариант до рефакторинга
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