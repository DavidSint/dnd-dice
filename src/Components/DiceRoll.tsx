import { ReactElement } from 'react';
import { useDice } from '../utils';

function DiceRoll(): ReactElement {
  const { rolls } = useDice()
  return (
    <>
    {rolls.map((roll) => (
      <div 
        className={`die die-${roll.d}`} 
        key={roll.id}
      >
        <span>D{roll.d}</span>
        <p className="die-result">{roll.value || '-'}</p>
      </div>
      ))}
    </>
  )
}

export default DiceRoll;