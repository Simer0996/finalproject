import { gql } from '@apollo/react-hooks';

export const GET_BLOG_POSTS = gql`
            {
                getBlogs {
                id
        createdAt
            body
            username
    }
  }
            `;