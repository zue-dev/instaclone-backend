require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const PORT = process.env.PORT;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url} and PORT is ${PORT}`);
});
