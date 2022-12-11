import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { GET_BLOG_POSTS } from '../utils/graphql'
import { filter } from 'lodash'


const DeleteButton = ({ blogId }) => {
    console.log(blogId)
    const [confirmOpen, setConfirmOpen] = React.useState(false)

    // const [deleteBlog] = useMutation(DELETE_BLOG_POST, {
    //     update(proxy) {
    //         setConfirmOpen(false)
    //         const data = proxy.readQuery({
    //             query: GET_BLOG_POSTS
    //         })
    //         data.getBlogs = data.getBlogs.filter((o) => o.id !== blogId)
    //         proxy.writeQuery({ query: GET_BLOG_POSTS, data })
    //     },
    //     variables: { blogId }
    // })

    const [deleteBlog] = useMutation(DELETE_BLOG_POST, {
        update() {
            setConfirmOpen(false)
        },
        variables: { blogId }
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