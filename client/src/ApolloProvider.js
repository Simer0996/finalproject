import React from 'react'
import App from './App'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'

import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: 'https://simer.wmdd4950.com/project'
})

const authLink = setContext(() => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        }
    }
})


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
