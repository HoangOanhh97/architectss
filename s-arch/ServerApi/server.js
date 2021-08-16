require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@anniecluster.csjoy.mongodb.net/sarch?retryWrites=true`,
  {
    autoIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
).then(() => {
  console.log('MongoDB connected successfully!');
}).catch((reason) => {
  console.error('Error while connecting to MongoDB: ', reason);
})

async function startApolloServer() {
  try {
    process.env.tz = "UTC";
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        // const token = req.headers['authorization'] || req.headers['x-access-token'] || null;
        // return { token }
      }
    });
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

    var corsOptions = { origin: "http://localhost:4001" };
    app.use(cors(corsOptions));

    var rawBodySaver = function (req, res, buf, encoding) {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8')
      };
    }
    // parse requests of content-type - application/json
    app.use(bodyParser.json({ verify: rawBodySaver }));
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
    // parse requests of content-type - */*
    app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));
    app.use('/api/auth', require('./mutations/auth'));

    const PORT = process.env.PORT || 4000;
    app.listen({ port: PORT }, () => {
      console.log(`🚀 We are live on http://localhost:${PORT + server.graphqlPath}`);
      console.log(`😷 Health checks available at ${process.env.MONGO_DB}`);
    });

    return { server, app };
  } catch (error) {
    console.log(error)
  }
}
startApolloServer();