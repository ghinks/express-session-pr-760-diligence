import { objectType } from '@nexus/schema';

const ilog = console.log; 
const elog = console.error;

// Currently in Prisma 2 (unlike Prisma 1), you must define root types
// twice; first in schema.prisma, and then again in code, prior to makeSchema(),
// to create schema.graphql. This sucks.

// Original vision (Prisma1 + Nexus):
// https://www.prisma.io/blog/using-graphql-nexus-with-a-database-pmyl3660ncst

// Problem, and workaround; there should be a better solution in time
// https://github.com/prisma/prisma/issues/383
// https://github.com/prisma/nexus-prisma/issues/339


const addAllFields = (obj: any) => {
  for (const method in obj) {
    if (typeof obj[method] === "function") {
      obj[method]();
    }
  }
}

export const getPrismaSchemaType = (typeName: string) => {
  return objectType({
    name: typeName,
    definition(t) {
      addAllFields(t.model);
    }
  });
}
