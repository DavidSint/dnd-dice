import React from 'react';

function SaveButton({ savedRolls, setSavedRolls, mod, dice  }) {
  return (
    <button className="save" tabIndex={0} onClick={() => {
      const [...arr] = savedRolls;
      const saveName = prompt("Please enter a name for this type of roll");
      if (saveName) {
        const newSavedRoll = {
          "id": `${saveName}@${new Date().getTime()}`,
          "name": saveName,
          "mod": mod ? mod : 0,
          "dice": dice ? dice.map(die => [...Array(die.count)].map(_ => die.d)).flat() : []
        };
        arr.push(newSavedRoll)
        setSavedRolls(arr)
      }
    }}>
      Save As
    </button>
  );
}

export default SaveButton;