import { createYoga } from 'graphql-yoga';
import { join } from 'node:path'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const typesArray = loadFilesSync(join(__dirname, '/../graphql/typedefs'));
const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(join(__dirname, '/../graphql/resolvers'))
const resolvers = mergeResolvers(resolversArray)

const graphqlSchemaWithResolvers = makeExecutableSchema({ typeDefs, resolvers });

export const graphqlRequestHandler = createYoga({
  schema: graphqlSchemaWithResolvers,
  // context: ({ request }) => ({
  //   userToken: request.headers.get('authorization'),
  // }),
  graphiql: true,
});
