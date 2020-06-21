const express = require('express');
const session = require('express-session');
const PrismaSessionStore = require('@quixo3/prisma-session-store')(session)
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const app = express();

app.use(
  session({
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


app.get('/foo', (req, res) => {
  res.send('foo');
});
app.listen(8888, () => console.log('...listening'));
