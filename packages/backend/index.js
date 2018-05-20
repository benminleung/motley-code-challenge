const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const config = require('./config');
const data = require('./data/data.json');
const { typeDefs } = require('./data/schema');
const { resolvers } = require('./data/resolvers');

const port = config.server.port;
const app = express();

app.listen(port, () => {
  console.log('Server started on: ' + port)
});

app.get('/api/users', (req, res) => {
  res.json(data);
})

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = data.find(user => {
    return user.id === id;
  })
  if (user) {
    res.json(user)
  } else {
    res.sendStatus(404)
  }
})

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));