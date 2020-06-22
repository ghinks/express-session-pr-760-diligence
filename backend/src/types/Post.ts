
import { getPrismaSchemaType } from '../utils/getPrismaSchemaType'

const ilog = console.log; 
const elog = console.error;

export const Post = getPrismaSchemaType('Post');

/*
import { objectType } from 'nexus';
export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.published();
    t.model.title();
    t.model.content();
    t.model.author();
  }
});
*/