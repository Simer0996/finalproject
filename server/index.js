// const { ApolloServer } = require('apollo-server');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// const typeDefs = require('./Graphql/typeDefs');
// const resolvers = require('./Graphql/resolvers/index');


// dotenv.config();

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => ({ req })
// });

// mongoose.connect(`${process.env.MONGODB}`, { useNewUrlParser: true })
//     .then(() => {
//         console.log('MongoDB Connected')

//         server.listen({ port: 5000 }).then(res => {
//             console.log(`Server running at ${res.url}`)
//         })
//     })



import express from 'express'
// import { ApolloServer } from 'apollo-server-express';
import http from 'http'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { typeDefs, resolvers } from './src/schema.js';

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const typeDefs = require('./Graphql/typeDefs');
const resolvers = require('./Graphql/resolvers/index');


dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    playground: true,
    introspection: true,
});

mongoose.connect(`${process.env.MONGODB}`, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected')

        server.listen({ port: 5000 }).then(res => {
            console.log(`Server running at ${res.url}`)
        })
    })

