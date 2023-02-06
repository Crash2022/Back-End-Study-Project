// https://back-end-study-project.vercel.app/

// create express app
import express, {Request, Response} from 'express'
const app = express()
const port = 3000

const products = [{title: 'mango'}, {title: 'orange'}]
const addresses = [{value: 'Sovetskaya, 17'}, {title: 'Naberejnaya, 10'}]

// get requests
app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai!')
})

app.get('/products', (req: Request, res: Response) => {
    res.send(products)
})
app.get('/products/:productTitle', (req: Request, res: Response) => {
    res.send(products.find(el => el.title === req.params.productTitle))
})

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})

// start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})