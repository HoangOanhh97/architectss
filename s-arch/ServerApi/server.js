require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

const { MongoClient } = require('mongodb');
async function connectDb() {
  const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@anniecluster.csjoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  try {
    await client.connect();
    const database = client.db('sarch');
    const members = await database.collection('members');
  } catch (error) {

  } finally {
    await client.close();
  }
}
connectDb().catch(console.error);

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
startApolloServer();