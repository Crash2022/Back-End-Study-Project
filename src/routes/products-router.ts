import {Request, Response, Router} from 'express'

// создание роутера
export const productsRouter = Router()

const products = [{id: 1, title: 'mango'}, {id: 2, title: 'orange'}]

// ---GET REQUESTS---
// QUERY params
productsRouter.get('/', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString()
        // res.send(products.filter(p => p.title.indexOf(searchString) > -1))
        res.send(products.filter(p => p.title.includes(searchString)))
    } else {
        res.send(products)
    }
})
// URI params
productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = products.find(el => el.id === +req.params.id)

    if(product) {
        res.send(product)
    } else {
        res.send(404)
    }
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

// ---DELETE REQUESTS---
// delete products
productsRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i,1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

// ---POST REQUESTS---
// post new product
productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = { id: +(new Date()), title: req.body.title }
    products.push(newProduct)
    res.status(201).send(newProduct)
})

// ---PUT REQUESTS---
// update product
productsRouter.put('/:id', (req: Request, res: Response) => {
    let product = products.find(el => el.id === +req.params.id)

    if(product) {
        product.title = req.body.title
        res.send(200)
        res.send(product)
    } else {
        res.send(404)
    }
})