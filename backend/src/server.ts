import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as expressSession from 'express-session'

//Prisma, and PrismaSessionStore
const prisma = new PrismaClient()
const PrismaSessionStore = require('@quixo3/prisma-session-store')(expressSession)

const app = express()

//Middleware

app.use(bodyParser.json())
 
app.use(
  expressSession({
    cookie: { 
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    store: new PrismaSessionStore(
      prisma, 
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: null,
      }
    )
  })
)
 
//Routes

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

//Server

const server = app.listen(backendPort, () =>
  console.log(
    '🚀 Prisma Studio ready at:'+ prismaStudioUrl + '\n' +
    '🚀 Server at:' + backendUrl + '\n'
    ) 
)
