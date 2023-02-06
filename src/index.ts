import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from './routes/products-router'
import {addressesRouter} from './routes/addresses-router'

// https://back-end-study-project.vercel.app/

// create express app
const app = express()
const port = 3000
// const port = process.env.PORT || 3000

// при отправке post запроса необходимо распарсить body-post
// подключение Middleware ко всему приложению
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

//----------------------------------------------------

// пример #1 Middleware
const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (req.query.token === '123') {
        next()
    } else {
        res.send(401)
    }

}
// app.use(authGuardMiddleware)

// пример #2 Middleware
let counterRequest = 0
const counterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    counterRequest++
    next()

    // *пример передачи информации
    // @ts-ignore
    // req.title = 'blablabla'
    // next()
}
// app.use(counterMiddleware)

// пример подключения Middleware к конкретному роуту
// app.get('/products', counterMiddleware, (req: Request, res: Response) => {
//     res.send({value: 'Counter: ' + counterRequest})
//
//     // *пример передачи информации
//     // @ts-ignore
//     // const title = req.title
//     // res.send({value: 'Counter: ' + title})
// })

//----------------------------------------------------

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