import React from 'react';
import { IDiceItemProps } from '../common/types';

function DiceItem(props: IDiceItemProps) {
  const { die, roller } = props;
  return (
    <div 
      className="dice-item"
      role="button"
      tabIndex={0}
      onClick={() => {
        roller([die]);
      }
    }>
      <img src={`${process.env.PUBLIC_URL}/dice/d${die}.png`} alt={`Roll a d${die}`} className="dice-image"/>
      <p className={`dice-text ${die === 4 ? `dice-text--d${die}` : ""}`} aria-hidden="true">{"D" + die}</p>
    </div>
  );
}

export default DiceItem;