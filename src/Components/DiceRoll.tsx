import React from 'react';
import { IDiceRollProps } from '../common/types';

function DiceRoll(props: IDiceRollProps){
  const { rolls, removeADie } = props;
  return (
    <>
    {rolls.map((roll, i) => {
      return (
      <div 
        className={`die die-${roll.d}`} 
        key={i}
        tabIndex={0}
        style={{cursor: `url(${process.env.PUBLIC_URL}/trash-2.svg), not-allowed`}}
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
        <p className="die-result">{roll.value || '-'}</p>
      </div>
      )
    })}
    </>
  )
}

export default DiceRoll;