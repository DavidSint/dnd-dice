// eslint-disable-next-line no-use-before-define
import { ReactElement } from "react";
import { useDice } from "../utils";

function SaveButton(): ReactElement {
  const { myMod, plannedDice: dice, savedRolls, setSavedRolls } = useDice();
  return (
    <button
      type="button"
      className="save"
      tabIndex={0}
      onClick={() => {
        const [...arr] = savedRolls;
        const saveName = prompt("Please enter a name for this type of roll");
        if (saveName) {
          const newSavedRoll = {
            id: `${saveName}@${new Date().getTime()}`,
            name: saveName,
            mod: myMod || 0,
            dice: dice ? dice.flatMap((die) => [...Array(die.count)].map(() => die.d)) : [],
          };
          arr.push(newSavedRoll);
          setSavedRolls(arr);
        }
      }}
    >
      Save As
    </button>
  );
}

export default SaveButton;
