import {Request, Response, Router} from 'express'
import {productsRepository} from '../repositories/products.repository';

// router - презентационный слой
// создание роутера
export const productsRouter = Router()

// ---GET REQUESTS---
// QUERY params
productsRouter.get('/', (req: Request, res: Response) => {
    const foundedProducts = productsRepository
        .findProducts(req.query.title ? req.query.title.toString() : null )
    res.send(foundedProducts)

    // if (req.query.title) {
    //     let searchString = req.query.title.toString()
    //     // res.send(products.filter(p => p.title.indexOf(searchString) > -1))
    //     res.send(products.filter(p => p.title.includes(searchString)))
    // } else {
    //     res.send(products)
    // }
})
// URI params
productsRouter.get('/:id', (req: Request, res: Response) => {
    const foundedProductWithId = productsRepository.findProductById(+req.params.id)

    if(foundedProductWithId) {
        res.send(foundedProductWithId)
    } else {
        res.send(404)
    }

    // let product = products.find(el => el.id === +req.params.id)
    //
    // if(product) {
    //     res.send(product)
    // } else {
    //     res.send(404)
    // }
})
// работает один из запросов, одновременно два не работают
// app.get('/products/:productTitle', (req: Request, res: Response) => {
//     let product = products.find(el => el.title === req.params.productTitle)
//     // если id будет цифрой, то надо перевести в строку
//     // let product = products.find(el => el.title === +req.params.productTitle)
//
//     if(product) {
//         res.send(product)
//     } else {
//         res.send(404)
//     }
// })

// ---POST REQUESTS---
// create new product
productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)

    // const newProduct = { id: +(new Date()), title: req.body.title }
    // products.push(newProduct)
    // res.status(201).send(newProduct)
})

// ---DELETE REQUESTS---
// delete products
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeletedProduct = productsRepository.deleteProduct(+req.params.id)

    if (isDeletedProduct) {
        res.send(204)
    } else {
        res.send(404)
    }

    // for (let i = 0; i < products.length; i++) {
    //     if (products[i].id === +req.params.id) {
    //         products.splice(i,1)
    //         res.send(204)
    //         return
    //     }
    // }
    // res.send(404)
})

// ---PUT REQUESTS---
// update product
productsRouter.put('/:id', (req: Request, res: Response) => {
    const isUpdatedProduct = productsRepository.updateProduct(+req.params.id, req.body.title)

    // если продукт обновился, то находим его заново и обновляем
    if (isUpdatedProduct) {
        res.send(productsRepository.findProductById(+req.params.id))
    } else {
        res.send(404)
    }

    // let product = products.find(el => el.id === +req.params.id)
    //
    // if(product) {
    //     product.title = req.body.title
    //     res.send(200)
    //     res.send(product)
    // } else {
    //     res.send(404)
    // }
})