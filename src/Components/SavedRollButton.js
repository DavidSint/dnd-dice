import React from 'react';

function SavedRollButton(props) {
  const { resetAndRoll, savedRoll, removeASave } = props

  return (
    <button
      className="filterScroller-item"
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
