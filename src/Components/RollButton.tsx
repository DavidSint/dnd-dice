import { Dispatch, ReactElement } from "react";
import { IPlannedDie, IRollDice } from "../common/types";

interface IRollButton {
  rollDice: ({ plannedDice, mod, inGame, myName, setMod, setName}: IRollDice) => void,
  plannedDice: IPlannedDie[],
  mod: number,
  setMod: Dispatch<React.SetStateAction<number>>,
  myName: string,
  setName: Dispatch<React.SetStateAction<string>>,
  inGame: string,
  socket: SocketIOClient.Socket
}
function RollButton({
  rollDice,
  plannedDice,
  mod,
  inGame,
  myName,
  setMod,
  setName,
  socket
}: IRollButton): ReactElement {
  return (
    <button
    type="button"
      className="roll"
      tabIndex={0}
      onClick={ () => {
        rollDice({
          plannedDice,
          mod,
          inGame,
          myName,
          setMod,
          setName,
          socket
        })
      }}
      >
      Roll
    </button>
  );
}

export default RollButton;