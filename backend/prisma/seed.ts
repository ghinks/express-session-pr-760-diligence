import { PrismaClient } from './../node_modules/@prisma/client'
import {genUserId, genPostId} from '../src/utils/gen-id'


const ilog = console.log; 
const elog = console.error;


const prisma = new PrismaClient();


async function main() {

  const user1 = await prisma.user.create({
    data: {
      id: genUserId(),
      phone: '+267-614-6835',
      email: 'alice@prisma.io',
      firstName: 'Alice',
      lastName: 'Jones',
      role: 'ADMIN',
      posts: {
        create: {
          id: genPostId(),
          title: 'Join us for Prisma Day 2019 in Berlin',
          content: 'https://www.prisma.io/day/',
          published: true,
        },
      },
    },
  })

  
  const user2 = await prisma.user.create({
    data: {
      id: genUserId(),
      phone: '+267-614-6833',
      email: 'bob@prisma.io',
      firstName: 'Bob',
      lastName: 'Machemer',
      role: 'USER',
      posts: {
        create: [
          {
            id: genPostId(),
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            id: genPostId(),
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: false,
          },
        ],
      },
    },
  })
  

  console.log({ user1, user2 })
}

main()
  .catch( e => {
    console.error(e)
    prisma.disconnect()
  })
