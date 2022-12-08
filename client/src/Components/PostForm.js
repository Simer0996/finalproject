import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/react-hooks'
import { GET_BLOG_POSTS } from '../utils/graphql'
import { useForm } from '../utils/hooks'

const PostForm = () => {
    const { onChange, onSubmit, values } = useForm(createBlogCallback, {
        body: ""
    })

    const [createBlog, { error }] = useMutation(CREATE_BLOG_MUTATION, {
        variables: values,
        update(proxy, result) {
            console.log(result.data.createBlog)
            const data = proxy.readQuery({
                query: GET_BLOG_POSTS
            })
            proxy.writeQuery({
                query: GET_BLOG_POSTS, data: {
                    getBlogs: [result.data.createBlog, ...data.getBlogs],

                }
            })
            values.body = ""
        }
    })

    function createBlogCallback() {
        createBlog()
    }


    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a Blog:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="body"
                    name="body"
                    type="text"
                    value={values.body}
                    onChange={onChange} />


            </Form.Field>
            <Button type="submit" color="teal">Submit</Button>
        </Form>
    )
}

const CREATE_BLOG_MUTATION = gql`
mutation createBlog($body: String!) {
    createBlog(body: $body) {
        id
        body
        createdAt
        username
        }
        }
        `

export default PostForm