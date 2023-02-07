import {Request, Response, Router} from 'express'
import {productsRepository} from '../repositories/products-db.repository';
import {body, validationResult} from 'express-validator';
import {titleValidationMiddleware} from '../middlewares/validation-middleware';

export type ProductType = {
    id: number
    title: string
}

// router - презентационный слой
// создание роутера
export const productsRouter = Router()

const titleValidation = body('title').trim()
    .isLength({min: 3, max: 10})
    .withMessage('title length must be 3-10 symbols')

// ---GET REQUESTS---
// QUERY params
productsRouter.get('/',
    async (req: Request, res: Response) => {
    const foundedProducts: ProductType[] = await productsRepository
        .findProducts(req.query.title ? req.query.title.toString() : null)
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
productsRouter.get('/:id',
    async (req: Request, res: Response) => {
    const foundedProductWithId = await productsRepository.findProductById(+req.params.id)

    if (foundedProductWithId) {
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
productsRouter.post('/',

    // title must have length
    // body('title').trim().isLength({min: 3, max: 10}).withMessage('title length must be 3-10 symbols'),
    titleValidation,
    titleValidationMiddleware,

    async (req: Request, res: Response) => {

        // заменили на titleValidationMiddleware
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({errors: errors.array()});
        // }

        const requestTitle = req.body.title

        // валидация body вручную
        // if (!requestTitle.trim()) {
        //     res.status(400).send({message: 'title is required'})
        // }

        const newProduct: ProductType = await productsRepository.createProduct(requestTitle)
        res.status(201).send(newProduct)

        // const newProduct = { id: +(new Date()), title: req.body.title }
// products.push(newProduct)
// res.status(201).send(newProduct)
    })

// ---DELETE REQUESTS---
// delete products
productsRouter.delete('/:id',
    async (req: Request, res: Response) => {
    const isDeletedProduct = await productsRepository.deleteProduct(+req.params.id)

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
productsRouter.put('/:id',
    titleValidation,
    titleValidationMiddleware,
    async (req: Request, res: Response) => {

        const isUpdatedProduct = await productsRepository.updateProduct(+req.params.id, req.body.title)

        // если продукт обновился, то находим его заново и обновляем
        if (isUpdatedProduct) {
            res.send(await productsRepository.findProductById(+req.params.id))
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