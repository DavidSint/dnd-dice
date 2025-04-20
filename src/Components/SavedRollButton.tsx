import { useAtomValue, useSetAtom } from "jotai";
import { ReactElement } from "react";
import { inGameAtom, myNameAtom, savedRollsAtom, socketAtom } from "../atoms";
import { SavedRoll } from "../common/types";
import { emitNewRoll, filterSavedRolls } from "../utils/helpers";

function SavedRollButton({ savedRoll }: { savedRoll: SavedRoll }): ReactElement {
  const inGame = useAtomValue(inGameAtom);
  const myName = useAtomValue(myNameAtom);
  const socket = useAtomValue(socketAtom);
  const savedRolls = useAtomValue(savedRollsAtom);
  const setSavedRolls = useSetAtom(savedRollsAtom);

  return (
    <button
      type="button"
      className="filterScroller-item"
      tabIndex={0}
      data-testid={`saved-roll-${savedRoll.name}`}
      onClick={() => {
        emitNewRoll({
          socket,
          dice: savedRoll.dice,
          modifier: savedRoll.mod,
          inGame,
          myName,
        });
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        const updatedRolls = filterSavedRolls({ id: savedRoll.id, savedRolls });
        setSavedRolls(updatedRolls);
      }}
    >
      {savedRoll.name}
    </button>
  );
}

export default SavedRollButton;
