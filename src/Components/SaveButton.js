import React from 'react';


function SaveButton(props) {
  const { savedRolls, setSavedRolls, mod, rolls  } = props

  return (
    <button className="save" tabIndex={0} onClick={() => {
      const [...arr] = savedRolls;
      const saveName = prompt("Please enter the name");
      if (saveName) {
        const newSavedRoll = {
          "id": `@${new Date().getTime()}`, 
          "name": saveName, 
          "mod": mod ? mod : 0, 
          "dice": rolls ? rolls.map(roll => roll.d) : []
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