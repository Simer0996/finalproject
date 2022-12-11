import React, { useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/react-hooks'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useForm } from "../utils/hooks"

const Register = (props) => {
    const navigate = useNavigate()
    const [errors, setErrors] = React.useState({})
    const context = useContext(AuthContext)


    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            console.log(result)
            context.login(result.data.register)
            navigate('/')
        },

        variables: values
    })

    function registerUser() {
        addUser()
    }


    return (
        <div>
            <Form onSubmit={onSubmit} noValidate style={{ width: "400px", margin: "auto" }} className={loading ? "loading" : ''}>
                <h1>Register</h1>
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
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="text"
                    error={errors.email ? true : false}
                    value={values.email}
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
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    error={errors.confirmPassword ? true : false}
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>Register</Button>
            </Form>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        ) {
            register(
                registerInput: {
                    username: $username
                    email: $email
                    password: $password
                    confirmPassword: $confirmPassword
                    }
                    ) {
                        id
                        email
                        token
                        username
                        createdAt
                        }
                        }
                        `

export default Register