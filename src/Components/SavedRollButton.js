import React from 'react';

function SavedRollButton(props) {
  const { i, resetAndRoll, savedRoll, removeASave } = props

  return (
    <button
      className="filterScroller-item" 
      key={i}
      tabIndex={0}
      onClick={ () => {
        resetAndRoll(savedRoll.dice, savedRoll.mod);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        removeASave(savedRoll.id);
      }}
    >
      {savedRoll.name}
    </button>
  );
}

export default SavedRollButton;
