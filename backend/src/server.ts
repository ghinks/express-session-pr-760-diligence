import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
const express = require('express')

const prisma = new PrismaClient()
const app = express()

app.use(bodyParser.json())


app.get('/', function (req, res) {
  res.send('hello world')
})

app.get(`/users/:id`, async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findOne({
    where: { id: Number(id) }
  })
  res.json(user)
})

app.get(`/users`, async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get(`/sessions/:id`, async (req, res) => {
  const { id } = req.params
  const session = await prisma.session.findOne({
    where: { id: Number(id) }
  })
  res.json(session)
})

app.get(`/sessions`, async (req, res) => {
  const users = await prisma.session.findMany()
  res.json(users)
})


//URL's and Paths
const backendBaseUrl = process.env.BACKEND_URL;
const prismaStudioPort = parseInt(process.env.PRISMA_PORT || '5555');
const backendPort = parseInt(process.env.BACKEND_PORT || '2020');
const backendUrl = backendBaseUrl + ':' + backendPort;
const prismaStudioUrl = backendBaseUrl + ':' + prismaStudioPort;


const server = app.listen(backendPort, () =>
  console.log(
    '🚀 Prisma Studio ready at:'+ prismaStudioUrl + '\n' +
    '🚀 REST API ready at:' + backendUrl + '\n'
    ) 
)
