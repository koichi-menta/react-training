import { ApolloServer } from "apollo-server";
import { typeDefs } from "./scheme.js";
import TodoAPI from "./datasource/todo-api.js";
import resolvers from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      todoAPI: new TodoAPI(),
    };
  },
});

server.listen().then(() => {
  console.log(`
      🚀  Server is running!
      🔉  Listening on port 4000
      📭  Query at https://studio.apollographql.com/dev
    `);
});
