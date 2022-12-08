import React, { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function AuthRoute({ element: Element, ...rest }) {
    const { user } = useContext(AuthContext)
    return (
        <Route
            {...rest}
            render={props => user ? <Navigate to="/" /> : <Element {...props} />}
        />
    )
}

export default AuthRoute