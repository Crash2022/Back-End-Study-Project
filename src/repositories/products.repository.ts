// repository - дата-слой

const products = [
    {id: 1, title: 'mango'},
    {id: 2, title: 'orange'}
]

export const productsRepository = {
    findProducts(searchTitle: string | null) {
        if (searchTitle) {
            return products.filter(p => p.title.includes(searchTitle))
        } else {
            return products
        }
    },
    findProductById(searchId: number) {
        return products.find(el => el.id === +searchId)
    },
    createProduct(productTitle: string) {
        const newProduct = { id: +(new Date()), title: productTitle }
        products.push(newProduct)
        return newProduct
    },
    deleteProduct(productId: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === +productId) {
                products.splice(i,1)
                return true
            }
        }
        return false
    },
    updateProduct(productId: number, productTitle: string) {
        let product = products.find(el => el.id === +productId)

        if(product) {
            product.title = productTitle
            return true
        } else {
            return false
        }
    }
}