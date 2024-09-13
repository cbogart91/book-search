import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation addUser ($username: String!, $email: String!, $password: String!) {
  addUser (username: $username, email: $email, password: $password) {
    token
    user {
    _id
   }
  }
}
`;

export const ADD_BOOK = gql`
mutation userSaveBook($authors: String, $description: String, $title: String!, $bookId: String!, $image: String, $link: String) {
  userSaveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation userRemoveBook($bookId: String!) {
    userRemoveBook(bookId: $bookId) {
      savedBooks {
        title
      }
    }
  }
`;


export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      _id
      email
      username
      password
    }
    token
  }
}
`;