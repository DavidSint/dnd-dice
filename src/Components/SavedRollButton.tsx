import { ReactElement } from "react";
import { ISavedRoll } from "../common/types";
import { removeASave, resetAndRoll, useDice } from "../utils";

function SavedRollButton({ savedRoll }: { savedRoll: ISavedRoll }): ReactElement {
  const { inGame, myName, setMod, setName, savedRolls, setSavedRolls, socket } = useDice();
  return (
    <button
      type="button"
      className="filterScroller-item"
      tabIndex={0}
      onClick={() => {
        resetAndRoll({
          dice: savedRoll.dice,
          modifier: savedRoll.mod,
          inGame,
          myName,
          setMod,
          setName,
          socket,
        });
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        removeASave({
          id: savedRoll.id,
          savedRolls,
          setSavedRolls,
        });
      }}
    >
      {savedRoll.name}
    </button>
  );
}

export default SavedRollButton;
