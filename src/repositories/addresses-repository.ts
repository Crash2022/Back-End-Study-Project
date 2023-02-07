// repository - дата-слой

export type AddressesType = {
    id: number
    value: string
}

const addresses = [
    {id: 1, value: 'Sovetskaya, 17'},
    {id: 2, value: 'Naberejnaya, 10'}
]

export const addressesRepository = {
    async findAddresses(): Promise<AddressesType[]> {
        return addresses
    },
    async findAddressesById(addressId: number) {
        return addresses.find(el => el.id === +addressId)
    }
}