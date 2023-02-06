// https://back-end-study-project.vercel.app/

// create express app
import express, {Request, Response} from 'express'
const app = express()
const port = 3000

const products = [{id: '1', title: 'mango'}, {id: '2', title: 'orange'}]
const addresses = [{id: '1', value: 'Sovetskaya, 17'}, {id: '2', title: 'Naberejnaya, 10'}]

// get requests
// get PRODUCTS
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
    let product = products.find(el => el.id === req.params.id)
    // если id будет цифрой, то надо перевести в строку
    // let product = products.find(el => el.title === +req.params.id)

    if(product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.get('/products/:productTitle', (req: Request, res: Response) => {
    let product = products.find(el => el.title === req.params.productTitle)
    // если id будет цифрой, то надо перевести в строку
    // let product = products.find(el => el.title === +req.params.productTitle)

    if(product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

// delete PRODUCTS



//---------------------------------------------------------------------

// get ADDRESSES
app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    let address = addresses.find(el => el.id === req.params.id)
    // если id будет цифрой, то надо перевести в строку
    // let address = addresses.find(el => el.id === +req.params.id)

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