import React from 'react';
import ColumnsContainer from './Components/ColumnsContainer';

function App() {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-8">Kanban Board</h1>
      <ColumnsContainer />
    </div>
  );
}

export default App;
