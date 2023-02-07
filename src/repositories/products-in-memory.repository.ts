// repository - дата-слой

import {ProductType} from "../routes/products-router";

const products = [
    {id: 1, title: 'mango'},
    {id: 2, title: 'orange'}
]

export const productsRepository = {
    async findProducts(searchTitle: string | null): Promise<ProductType[]> {
        if (searchTitle) {
            return products.filter(p => p.title.includes(searchTitle))
        } else {
            return products
        }
    },
    async findProductById(searchId: number) {
        return products.find(el => el.id === +searchId)
    },
    async createProduct(productTitle: string): Promise<ProductType> {
        const newProduct = { id: +(new Date()), title: productTitle }
        products.push(newProduct)
        return newProduct
    },
    async deleteProduct(productId: number): Promise<boolean> {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === +productId) {
                products.splice(i,1)
                return true
            }
        }
        return false
    },
    async updateProduct(productId: number, productTitle: string): Promise<boolean> {
        let product = products.find(el => el.id === +productId)

        if(product) {
            product.title = productTitle
            return true
        } else {
            return false
        }
    }
}