import React from 'react';

function DiceItem(props) {
  const { die, roller } = props;
  return (
    <div 
      className="dice-item" 
      role="button" 
      tabIndex="0" 
      onClick={() => {
        roller([die]);
      }
    }>
      <img src={`/dice/d${die}.png`} alt={`Roll a d${die}`} className="dice-image"/>
      <p className={`dice-text ${die === 4 ? `dice-text--d${die}` : ""}`} aria-hidden="true">{"D" + die}</p>
    </div>
  );
}

export default DiceItem;