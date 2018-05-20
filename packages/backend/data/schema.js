typeDefs = [`

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
  address: Address
  phone: String
  website: String
  company: Company
}

type Address {
  street: String!
  suite: String!
  city: String!
  zipcode: String!
  geo: GeoLocation
}

type GeoLocation {
  lat: Float!
  lng: Float!
}

type Company {
  name: String!
  catchPhrase: String
  bs: String
}

type Query {
  users: [User]
  user(id: ID!): User
}

schema {
  query: Query
}
`];

module.exports.typeDefs = typeDefs;
