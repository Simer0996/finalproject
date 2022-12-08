import React, { useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/react-hooks'
import { useNavigate } from 'react-router-dom'
import { useForm } from "../utils/hooks"
import { AuthContext } from '../context/auth'

const Login = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = React.useState({})
    const context = useContext(AuthContext)


    const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
        username: "",
        password: "",
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            console.log(result)
            context.login(result.data.login)
            navigate('/')
        },
        // onError(err) {
        //     if (err) {
        //         alert("Input each and every fields")
        //     }

        // },
        variables: values
    })

    function loginUserCallBack() {
        loginUser()
    }


    return (
        <div>
            <Form onSubmit={onSubmit} noValidate style={{ width: "400px", margin: "auto" }} className={loading ? "loading" : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    error={errors.username ? true : false}
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={onChange}
                />
                <Button type="submit" primary>Login</Button>
            </Form>
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
        ) {
            login(
                    username: $username
                    password: $password
                    ) {
                        id
                        email
                        token
                        username
                        createdAt
                        }
                        }
                        `

export default Login