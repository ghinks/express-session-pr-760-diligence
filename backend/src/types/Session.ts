
import { getPrismaSchemaType } from '../utils/getPrismaSchemaType'

const ilog = console.log; 
const elog = console.error;

export const Session = getPrismaSchemaType('Session');

/*
import { objectType } from 'nexus';
export const Session = objectType({
  name: 'Session',
  definition(t) {
    t.model.id();
    t.model.sid();
    t.model.data();
    t.model.expires();
  }
});
*/