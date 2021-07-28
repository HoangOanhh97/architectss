require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

async function startApolloServer() {
  try {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    const app = express();

    // Mount Apollo middleware here.
    server.applyMiddleware({
      app,
      path: '/api'
    });
    app.listen({ port: 4001 }, () =>
      console.log(`🚀 We are live on http://localhost:4001${server.graphqlPath}`)
    );

    return { server, app };
  } catch (error) {
    console.log(error)
  }
}

startApolloServer()