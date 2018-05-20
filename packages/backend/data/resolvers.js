const data = require('./data.json');

resolvers = {
  Query: {
    users() {
      return data;
    },
    user(_, { id }) {
      const cast = Number(id);
      const user = data.find(user => {
        return user.id === cast;
      })
      return user;
    }
  }
}

module.exports.resolvers = resolvers;