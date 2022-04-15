import { makeSchema } from "nexus";
import { join } from 'path';
import * as types from './types';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join( // Nexus generates types for you from your object types, your resolvers now will have type safety and autocomplete
      process.cwd(),
      'node_modules', 
      '@types',
      'nexus-typegen',
      'index.d.ts' // location
    ),
    schema: join(process.cwd(), 'graphql', 'schema.graphql') // location of the generated schema
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts')
  }
})