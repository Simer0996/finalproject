const Blog = require('../../models/Blogs');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        async getBlogs() {
            try {
                const blogs = await Blog.find().sort({ createdAt: -1 });
                return blogs;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getBlog(_, { blogId }) {
            try {
                const blog = await Blog.findById(blogId);
                if (blog) {
                    return blog;
                } else {
                    throw new Error('Blog not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createBlog(_, { body, title }, context) {
            const user = checkAuth(context);

            if (body.trim() === '') {
                throw new Error('Blog body must not be empty');
            }

            const newBlog = new Blog({
                body,
                title,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const blog = await newBlog.save();
            return blog;
        },

        async deleteBlog(_, { blogId }, context) {
            const user = checkAuth(context);

            try {
                const blog = await Post.findById(blogId);
                if (user.username === blog.username) {
                    await blog.delete();
                    return 'Blog deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },

    }
}