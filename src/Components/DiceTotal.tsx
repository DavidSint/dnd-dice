import { ReactElement } from 'react';
import { IRoll } from '../common/types';

interface IDiceTotal {
  rolls: IRoll[],
  mod: number
}
function DiceTotal(props: IDiceTotal): ReactElement {
  const { rolls, mod } = props;
    return (
      <>
        <p>{mod ? `Mod: ${mod}` : ""}</p>
        <strong>{rolls.length>0 ? `Total:${rolls.map(roll => roll.value).reduce((a,b) => a+b) + mod}` : ""}</strong>
      </>
    )
}

export default DiceTotal;