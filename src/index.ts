import express, {Request, Response} from 'express'
import { ObjectId } from 'mongodb'
import db from './db'
const app = express()
import { Point } from './interfaces'
import { pointValidator } from './validators'
import {auth} from './auth'
import cors from 'cors'
app.use(cors())
// setup dotenv
import dotenv from 'dotenv'
dotenv.config()

app.use(express.json()) 
app.use('/img/', express.static('markers'))


app.get('/', async (_req: Request, res: Response) => {
  // await db.insertOne({world: 'overworld', point: [23, 43]})
  res.send({message: 'Server is running'})
})

// create point
app.post('/point', auth, async (req:Request, res: Response) => {
  let data = req.body as Point ?? {}
  let {error} = pointValidator.validate(data)
  delete data.password
  if (error) {
    res.status(400).send({error: error.message})
    return
  }
  try {
    await db.insertOne(data)
    res.status(200).send({message: "Successfully created point"})
  }
  catch (err) {
    res.status(500).send({error: "Failed to create point"})
  }
})

// get all points
app.get('/allpoints', async (_req: Request, res: Response) => {
  let points = await db.find({}).toArray()
  res.status(200).send(points)
})

// get one point
app.get('/point/:id', async (req: Request<{id: ObjectId}, {}, {}>, res: Response) => {
  let id = new ObjectId(req.params.id)
  let point = await db.findOne({_id: id})
  res.status(200).send(point)
})

// update point
app.put('/point/:id', auth, async (req: Request, res: Response) => {
  let id = req.params.id
  let data = req.body as Point
  let {error} = pointValidator.validate(data)
  if (error) {
    res.status(400).send({message: error.message})
    return
  }
  try {
    await db.updateOne({_id: new ObjectId(id)}, {$set: data})
    res.status(200).send({message: "Successfully updated point"})
  } catch (err) {
    res.status(500).send({message: "Failed to update point"})
  }
})

// delete point
app.delete('/point/:id', auth, async (req: Request, res: Response) => {
  let id = req.params.id
  try {
    await db.deleteOne({_id: new ObjectId(id)})
    res.status(200).send({message: "Successfully deleted point"})
  } catch (err) {
    res.status(500).send({message: "Failed to delete point"})
  }
})

// return the names of all the markers from ../markers/ folder
app.get('/markers', async (_req: Request, res: Response) => {
  const fs = require('fs')
  const path = require('path')
  const directoryPath = path.join(__dirname, '../markers')
  fs.readdir(directoryPath, function (err: any, files: any) {
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }
    res.status(200).send(files)
  })
})


app.listen(3000, () => {
  console.log('Listening on port 3000')
})
