const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: String
    savedBooks: [Book]!
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser (username: String!, email: String!, password: String!): Auth
    userSaveBook(authors: String, description: String, title: String!, bookId: String!, image: String, link: String): User
    userRemoveBook(bookId: String!): User
  }
`;

module.exports = typeDefs;