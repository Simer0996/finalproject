const blogsResolvers = require('./blogs');
const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...blogsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...blogsResolvers.Mutation
    }
}