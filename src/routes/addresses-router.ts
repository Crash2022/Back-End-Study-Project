import {Request, Response, Router} from 'express'

// создание роутера
export const addressesRouter = Router()

const addresses = [{id: 1, value: 'Sovetskaya, 17'}, {id: 2, title: 'Naberejnaya, 10'}]

// get addresses
addressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addresses)
})
// with URI params
addressesRouter.get('/:id', (req: Request, res: Response) => {
    let address = addresses.find(el => el.id === +req.params.id)

    if(address) {
        res.send(address)
    } else {
        res.send(404)
    }
})