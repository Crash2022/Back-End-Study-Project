import {MongoClient} from 'mongodb'

// const mongoURI = process.env.mongoURI || 'mongodb://0.0.0.0:27017'
const mongoURI = 'mongodb://0.0.0.0:27017'

const client = new MongoClient(mongoURI)

// доступ к коллекциям
export const productsCollection = client.db('shop').collection<ProductType>('products')

export async function runDb() {
    try {
        // Connect to the client server
        await client.connect()
        // Establish and verify connection
        await client.db('products').command({ ping: 1 })
        console.log('Connected successfully to Mongo server')
    } catch {
        console.log('Can not connect to DB')
        // Ensures that the client will close when you finish/error
        await client.close()
    }
}

// types
export type ProductType = {
    id: number
    title: string
}