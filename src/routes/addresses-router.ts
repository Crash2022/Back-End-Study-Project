import {Request, Response, Router} from 'express'
import {addressesRepository, AddressesType} from '../repositories/addresses-repository';

// router - презентационный слой
// создание роутера
export const addressesRouter = Router()

// get addresses
addressesRouter.get('/',
    async (req: Request, res: Response) => {
    const foundedAddresses: AddressesType[] = await addressesRepository.findAddresses()
    res.send(foundedAddresses)
})
// with URI params
addressesRouter.get('/:id',
    async (req: Request, res: Response) => {
    const foundedAddressWithId = await addressesRepository.findAddressesById(+req.params.id)

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