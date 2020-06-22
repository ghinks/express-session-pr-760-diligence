import { getPrismaSchemaType } from '../utils/getPrismaSchemaType'

const ilog = console.log; 
const elog = console.error;

export const User = getPrismaSchemaType('User');

/*
import { objectType } from 'nexus'
export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.blacklisted()
    t.model.phone()
    t.model.email()
    t.model.firstName()
    t.model.lastName()
    t.model.role()
    t.model.posts()
  },
})
*/