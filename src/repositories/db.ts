import {MongoClient} from 'mongodb'

const mongoUri = process.env.mongoUri = 'mongodb://0.0.0.0:27107/?maxPoolSize=20&w=majority'

export const client = new MongoClient(mongoUri0)

export async function runDb() {
    try {
        await client.connect()
        await client.db('products').command({ ping: 1 })
    } catch {
        await client.close()
    }
}