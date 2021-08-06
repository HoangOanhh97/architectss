require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@anniecluster.csjoy.mongodb.net/sarch?retryWrites=true`,
  { useUnifiedTopology: true }
).then(() => {
  console.log('MongoDB connected successfully!');
}).catch((reason) => {
  console.error('Error while connecting to MongoDB: ', reason);
})

async function startApolloServer() {
  try {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    const app = express();

    server.applyMiddleware({
      app,
      path: '/api',
      onHealthCheck: () => {
        new Promise((resolve, reject) => {
          if (mongoose.connection.readyState > 0) {
            resolve();
          } else {
            reject();
          }
        })
      }
    });
    app.listen({ port: 4001 }, () => {
      console.log(`🚀 We are live on http://localhost:4001${server.graphqlPath}`);
      console.log(`😷 Health checks available at ${process.env.MONGO_DB}`);
    });

    return { server, app };
  } catch (error) {
    console.log(error)
  }
}
startApolloServer();