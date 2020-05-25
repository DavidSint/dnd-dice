import React from 'react';

function DiceTotal(props){
  const { rolls, mod } = props;
  if (rolls.length>0) {
    return (
      <>
        <p>{mod ? `Mod: ${mod}` : ""}</p>
        <strong>Total:{rolls.map(roll => roll.value).reduce((a,b) => a+b) + mod}</strong>
      </>
    )
  }
  return null;
}

export default DiceTotal;