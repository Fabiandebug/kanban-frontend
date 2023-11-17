import React from 'react';
import { useQuery,useMutation, gql } from '@apollo/client';
import Column from './Columns';


const GET_COLUMNS = gql`
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

const CREATE_COLUMN = gql`
  mutation CreateColumn($title: String!) {
    createColumn(title: $title) {
      column {
        id
        title
        cards {
          id
          content
        }
      }
    }
  }
`;

const ColumnsContainer = () => {
  const { loading, error, data, refetch } = useQuery(GET_COLUMNS);
  const [createColumn] = useMutation(CREATE_COLUMN);

  const handleCreateColumn = async () => {
    const title = prompt('Enter column title:');
    if (title) {
      await createColumn({ variables: { title } });
      refetch(); // Refetch the columns to update the UI
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex">
        {data.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
      <button onClick={handleCreateColumn}>Create Column</button>
    </div>
  );
};

export default ColumnsContainer;
