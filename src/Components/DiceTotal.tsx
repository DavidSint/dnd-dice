import React from 'react';
import { IDiceTotalProps } from '../common/types';


function DiceTotal(props: IDiceTotalProps){
  const { rolls, mod } = props;
    return (
      <>
        <p>{mod ? `Mod: ${mod}` : ""}</p>
        <strong>{rolls.length>0 ? `Total:${rolls.map(roll => roll.value).reduce((a,b) => a+b) + mod}` : ""}</strong>
      </>
    )
}

export default DiceTotal;