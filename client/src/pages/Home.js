import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid } from 'semantic-ui-react'
import BlogPost from '../Components/BlogCard'
import { AuthContext } from '../context/auth'
import PostForm from '../Components/PostForm'
import { GET_BLOG_POSTS } from '../utils/graphql'

const Home = () => {

    const { user } = React.useContext(AuthContext)


    const { loading, error, data } = useQuery(GET_BLOG_POSTS);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    if (data) {
        console.log(data)
    }

    return (
        <>
            <Grid columns={3}>
                <Grid.Row><h1>Recent Blogs</h1></Grid.Row>
                <Grid.Row>
                    {user && (<Grid.Column>
                        <PostForm />
                    </Grid.Column>)}
                </Grid.Row>
                <Grid.Row>
                    {loading ? (<h1>Loading...</h1>) : data.getBlogs.map((blog) => (
                        <Grid.Column key={blog.id} style={{ marginBottom: "10px" }}>
                            <BlogPost key={blog.id} id={blog.id} body={blog.body} username={blog.username} title={blog.title} createdAt={blog.createdAt} />
                        </Grid.Column>
                    )).reverse
                        (
                    )}
                </Grid.Row>
            </Grid></>
    )
}




export default Home