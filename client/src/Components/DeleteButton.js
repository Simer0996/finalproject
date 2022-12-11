import React from 'react'
import { gql, useMutation } from '@apollo/react-hooks'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { GET_BLOG_POSTS } from '../utils/graphql'


const DeleteButton = ({ blogID }) => {
    console.log(blogID)
    const [confirmOpen, setConfirmOpen] = React.useState(false)

    const [deleteBlog] = useMutation(DELETE_BLOG_POST, {

        update(proxy) {
            setConfirmOpen(false)
            const data = proxy.readQuery({
                query: GET_BLOG_POSTS
            })
            data.getBlogs = data.getBlogs.filter((b) => b.id !== blogID)
            proxy.writeQuery({ query: GET_BLOG_POSTS, data })
        },
        variables: { blogID },
    })


    return (
        <div>
            <Button as="div" color="red" onClick={() => setConfirmOpen(true)}>
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deleteBlog} />
        </div>
    )
}

const DELETE_BLOG_POST = gql`
    mutation deleteBlog($blogId: ID!){
        deleteBlog(blogId: $blogId)
    }
`
export default DeleteButton