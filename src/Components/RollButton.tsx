import { IPlannedDie } from "../common/types";

interface IRollButton {
  rollDice: (diceWithCount: IPlannedDie[], mod: number) => void,
  plannedDice: IPlannedDie[],
  mod: number
}
function RollButton({ rollDice, plannedDice, mod }: IRollButton) {
  return (
    <button
      className="roll"
      tabIndex={0}
      onClick={ () => {
        rollDice(plannedDice, mod)
      }}
      >
      Roll
    </button>
  );
}

export default RollButton;