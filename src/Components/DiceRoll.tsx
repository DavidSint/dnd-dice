import { IRoll } from '../common/types';

interface IDiceRoll {
  rolls: IRoll[]
}
function DiceRoll({ rolls }: IDiceRoll ){
  return (
    <>
    {rolls.map((roll, i) => {
      return (
      <div 
        className={`die die-${roll.d}`} 
        key={i}
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