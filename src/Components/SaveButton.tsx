// eslint-disable-next-line no-use-before-define
import React, { Dispatch, ReactElement } from "react";
import { IPlannedDie, ISavedRoll } from "../common/types";

interface ISaveButton {
  savedRolls: ISavedRoll[]
  setSavedRolls: Dispatch<React.SetStateAction<ISavedRoll[]>>,
  mod: number,
  dice: IPlannedDie[]
}
function SaveButton({ savedRolls, setSavedRolls, mod, dice }: ISaveButton): ReactElement {
  return (
    <button type="button" className="save" tabIndex={0} onClick={() => {
      const [...arr] = savedRolls;
      const saveName = prompt("Please enter a name for this type of roll");
      if (saveName) {
        const newSavedRoll = {
          "id": `${saveName}@${new Date().getTime()}`,
          "name": saveName,
          "mod": mod || 0,
          "dice": dice ? dice.map(die => [...Array(die.count)].map(() => die.d)).flat() : []
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