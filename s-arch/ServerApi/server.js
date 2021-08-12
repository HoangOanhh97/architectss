require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@anniecluster.csjoy.mongodb.net/sarch?retryWrites=true`,
  {
    autoIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  }
).then(() => {
  console.log('MongoDB connected successfully!');
}).catch((reason) => {
  console.error('Error while connecting to MongoDB: ', reason);
})

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET)
    }
    return null
  } catch (error) {
    return null
  }
}

async function startApolloServer() {
  try {
    process.env.tz = "UTC";
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        // Get the user token from the headers.
        const token = req.headers.authorization || '';
        // Try to retrieve a user with the token
        const user = getUser(token);
        if (!user) {
          console.log('You must be logged in!');
        };
        // return { user };
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