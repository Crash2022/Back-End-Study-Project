// repository - дата-слой

const addresses = [
    {id: 1, value: 'Sovetskaya, 17'},
    {id: 2, title: 'Naberejnaya, 10'}
]

export const addressesRepository = {
    findAddresses() {
        return addresses
    },
    findAddressesById(addressId: number) {
        return addresses.find(el => el.id === +addressId)
    }
}