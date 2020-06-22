import { PrismaClient } from '@prisma/client'
import { ContextParameters } from 'graphql-yoga/dist/types'

const ilog = console.log; 
const elog = console.error;

export const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  request: any
}

export function createContext(request: ContextParameters) {
  return {
    ...request,
    prisma,
  }
}