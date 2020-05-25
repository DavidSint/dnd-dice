import React from 'react';

function DiceRoll(props){
  const { rolls, removeADie } = props;
  return (
    <>
    {rolls.map((roll, i) => {
      return (
      <div 
        className={`die die-${roll.d}`} 
        key={i}
        tabIndex="0"
        onContextMenu={(e) => {
          e.preventDefault();
          removeADie(roll.id);
        }}
        onClick={(e) => {
          e.preventDefault();
          removeADie(roll.id);
        }}
      >
        <span>D{roll.d}</span>
        <p className="die-result">{roll.value}</p>
      </div>
      )
    })}
    </>
  )
}

export default DiceRoll;