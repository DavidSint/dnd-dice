import { useAtom, useAtomValue } from "jotai";
import { ReactElement } from "react";
import { myModAtom, plannedDiceAtom, savedRollsAtom } from "../atoms";

function SaveButton(): ReactElement {
  const myMod = useAtomValue(myModAtom);
  const dice = useAtomValue(plannedDiceAtom);
  const [savedRolls, setSavedRolls] = useAtom(savedRollsAtom);
  if (dice.length <= 0) {
    return <></>;
  }
  return (
    <button
      type="button"
      className="save"
      tabIndex={0}
      data-testid="save"
      onClick={() => {
        const saveName = prompt("Please enter a name for this type of roll");
        if (saveName) {
          const newSavedRoll = {
            id: `${saveName}@${new Date().getTime()}`,
            name: saveName,
            mod: myMod || 0,
            dice: dice ? dice.flatMap((die) => [...Array(die.count)].map(() => die.d)) : [],
          };
          setSavedRolls([...savedRolls, newSavedRoll]);
        }
      }}
    >
      Save As
    </button>
  );
}

export default SaveButton;
