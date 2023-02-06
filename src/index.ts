import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

// https://back-end-study-project.vercel.app/

// create express app
const app = express()
const port = 3000
// const port = process.env.PORT || 3000

const products = [{id: 1, title: 'mango'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, value: 'Sovetskaya, 17'}, {id: 2, title: 'Naberejnaya, 10'}]

// при отправке post запроса необходимо распарсить body-post
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

// GET REQUESTS
// get products
app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai!')
})

// query params
app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString()
        // res.send(products.filter(p => p.title.indexOf(searchString) > -1))
        res.send(products.filter(p => p.title.includes(searchString)))
    } else {
        res.send(products)
    }
})
// params
app.get('/products/:id', (req: Request, res: Response) => {
    // если id будет цифрой, то надо перевести в строку
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

// DELETE REQUESTS
// delete products
app.delete('/products/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i,1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

// POST REQUESTS
// post new product
app.post('/products/', (req: Request, res: Response) => {
    const newProduct = { id: +(new Date()), title: req.body.title }
    products.push(newProduct)
    res.status(201).send(newProduct)
})

//---------------------------------------------------------------------

// get addresses
app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    let address = addresses.find(el => el.id === +req.params.id)

    if(address) {
        res.send(address)
    } else {
        res.send(404)
    }
})

// start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})