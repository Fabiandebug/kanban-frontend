import { gql } from '@apollo/client';

export const GET_COLUMNS = gql`
  query {
    columns {
      id
      title
      cards {
        id
        content
      }
    }
  }
`;

export const CREATE_CARD = gql`
  mutation CreateCard($content: String!, $columnId: ID!) {
    createCard(content: $content, columnId: $columnId) {
      card {
        id
        content
        column {
          id
          title
        }
      }
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation RemoveCard($cardId: ID!) {
    removeCard(cardId: $cardId) {
      success
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($cardId: ID!, $content: String!) {
    updateCard(cardId: $cardId, content: $content) {
      card {
        id
        content
      }
    }
  }
`;
