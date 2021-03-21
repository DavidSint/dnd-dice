import { ReactElement } from 'react';
import { IRoll } from '../common/types';

interface IDiceRoll {
  rolls: IRoll[]
}
function DiceRoll({ rolls }: IDiceRoll ): ReactElement {
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