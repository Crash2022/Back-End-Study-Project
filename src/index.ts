import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from './routes/products-router'
import {addressesRouter} from './routes/addresses-router'

// https://back-end-study-project.vercel.app/

// create express app
const app = express()
const port = 3000
// const port = process.env.PORT || 3000

// при отправке post запроса необходимо распарсить body-post
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

// стартовая страница
app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai!')
})

// подключение к отдельным роутам
app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

// start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})