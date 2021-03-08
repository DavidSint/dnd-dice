import React from 'react';
import { IDiceRollProps } from '../common/types';

function DiceRoll(props: IDiceRollProps){
  const { rolls } = props;
  return (
    <>
    {rolls.map((roll, i) => {
      return (
      <div 
        className={`die die-${roll.d}`} 
        key={i}
        tabIndex={0}
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