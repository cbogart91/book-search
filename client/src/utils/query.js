import { gql } from '@apollo/client';

/** Query to get a user */
export const GET_USER = gql`
  query GET_USER {
    user {
      savedBooks {
        authors
        title
        bookId
      }
    }
  }
`;