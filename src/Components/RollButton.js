import React from 'react';

function RollButton(props) {
  const { resetAndRoll, rolls, mod } = props

  return (
    <button 
      className="roll"
      tabIndex={0}
      onClick={ () => {
        resetAndRoll(rolls.map(roll => roll.d), mod);
      }}
      >
      Roll
    </button>
  );
}

export default RollButton;