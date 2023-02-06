import {Request, Response, Router} from 'express'
import {addressesRepository} from '../repositories/addresses-repository';
import {productsRepository} from '../repositories/products.repository';

// router - презентационный слой
// создание роутера
export const addressesRouter = Router()

// get addresses
addressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addressesRepository.findAddresses())
    // res.send(addresses)
})
// with URI params
addressesRouter.get('/:id', (req: Request, res: Response) => {
    const foundedAddressWithId = addressesRepository.findAddressesById(+req.params.id)

    if(foundedAddressWithId) {
        res.send(foundedAddressWithId)
    } else {
        res.send(404)
    }

    // let address = addresses.find(el => el.id === +req.params.id)
    //
    // if(address) {
    //     res.send(address)
    // } else {
    //     res.send(404)
    // }
})