import { useAtomValue, useSetAtom } from "jotai";
import { ReactElement } from "react";
import { inGameAtom, myModAtom, myNameAtom, plannedDiceAtom, socketAtom } from "../atoms";
import { rollPlannedDice } from "../utils/helpers";

export default function RollButton(): ReactElement {
  const plannedDice = useAtomValue(plannedDiceAtom);
  const myMod = useAtomValue(myModAtom);
  const myName = useAtomValue(myNameAtom);
  const inGame = useAtomValue(inGameAtom);
  const socket = useAtomValue(socketAtom);
  const setPlannedDice = useSetAtom(plannedDiceAtom);

  return (
    <button
      type="button"
      className="roll"
      tabIndex={0}
      data-testid="roll"
      onClick={() => {
        rollPlannedDice({
          socket,
          plannedDice,
          mod: myMod,
          inGame,
          myName,
        });
      }}
    >
      Roll
    </button>
  );
}
