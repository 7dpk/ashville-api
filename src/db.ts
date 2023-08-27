import { MongoClient, MongoError } from "mongodb"
import dotenv from 'dotenv'
dotenv.config()
const client = new MongoClient(process.env.DB_HOST ?? '', {
   monitorCommands: true 
})

client.connect().then(() => {
  console.log('Connected to database')
}).catch((err : MongoError) => {
  console.error(err) 
})

let db = client.db('ashville').collection('points')

export default db