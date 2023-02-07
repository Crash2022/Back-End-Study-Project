import {MongoClient} from 'mongodb'

// const mongoURI = process.env.mongoURI || 'mongodb://0.0.0.0:27107'
const mongoURI = 'mongodb://0.0.0.0:27107'

export const client = new MongoClient(mongoURI)

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