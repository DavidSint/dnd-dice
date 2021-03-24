import { ReactElement } from "react";
import { useDice, rollDice } from "../utils"

export default function RollButton(): ReactElement {
  const { plannedDice, myMod, setMod, myName, setName, inGame, socket } = useDice();
  return(
    <button
    type="button"
      className="roll"
      tabIndex={0}
      onClick={ () => {
        rollDice({
          plannedDice,
          mod: myMod,
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
  )
}
