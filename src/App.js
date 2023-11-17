import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

import './App.css';

// GraphQL Queries and Mutations
import { GET_COLUMNS, CREATE_CARD, REMOVE_CARD, UPDATE_CARD } from './queries';

function App() {
  const client = useApolloClient();
  
  const { loading, error, data } = useQuery(GET_COLUMNS, { client });

  const [createCard] = useMutation(CREATE_CARD, { refetchQueries: [{ query: GET_COLUMNS }] });
  const [removeCard] = useMutation(REMOVE_CARD, { refetchQueries: [{ query: GET_COLUMNS }] });
  const [updateCard] = useMutation(UPDATE_CARD, { refetchQueries: [{ query: GET_COLUMNS }] });

  const handleCreateCard = (content, columnId) => {
    createCard({ variables: { content, columnId } });
  };

  const handleRemoveCard = (cardId) => {
    removeCard({ variables: { cardId } });
  };

  const handleUpdateCard = (cardId, content) => {
    updateCard({ variables: { cardId, content } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      {data.columns.map((column) => (
        <div key={column.id} className="column">
          <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
          <div className="cards">
            {column.cards.map((card) => (
              <div key={card.id} className="card">
                <p>{card.content}</p>
                <div className="card-actions">
                  <button onClick={() => handleRemoveCard(card.id)} className="text-red-600">
                    Remove
                  </button>
                  <input
                    type="text"
                    placeholder="Update content"
                    onChange={(e) => handleUpdateCard(card.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="add-card">
            <input
              type="text"
              placeholder="Enter new card content"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                  handleCreateCard(e.target.value, column.id);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
