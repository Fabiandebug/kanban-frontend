import React from 'react';

const Column = ({ column }) => {
  return (
    <div className="p-4 border rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">{column.title}</h2>
      <div>
        {column.cards.map((card) => (
          <div key={card.id} className="bg-white p-2 mb-2 rounded border">
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
