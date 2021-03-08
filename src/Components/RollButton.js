import React from 'react';

function RollButton({ rollDice, plannedDice, mod }) {
  return (
    <button
      className="roll"
      tabIndex={0}
      onClick={ () => {
        rollDice(plannedDice, mod)
      }}
      >
      Roll
    </button>
  );
}

export default RollButton;