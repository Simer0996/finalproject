import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import DeleteButton from "./DeleteButton"


const BlogCard = ({ id, createdAt, title, username, body }) => {

    const { user } = React.useContext(AuthContext)

    return (
        <>
            <div className="ui card">
                <div className="content">
                    <div className="header">{title}</div>
                    <div className="meta">
                        <span className="right floated time" as={Link} to={`/blogs/${id}`}>{moment(createdAt).fromNow()}</span>
                    </div>
                    <div className="description">
                        <p>{body}</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="right floated author">
                        {username}
                    </div>
                    {user && user.username === username && <DeleteButton blogId={id} />}<div></div>
                </div>
            </div>
        </>
    )
}

export default BlogCard