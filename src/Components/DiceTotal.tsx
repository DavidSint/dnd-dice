import { useAtomValue } from "jotai";
import { ReactElement } from "react";
import { latestRollAtom, modAtom, rollsAtom } from "../atoms";

function DiceTotal(): ReactElement {
  const rolls = useAtomValue(rollsAtom);
  const mod = useAtomValue(modAtom);
  const latestRoll = useAtomValue(latestRollAtom);
  return (
    <>
      <p>{latestRoll ? `Name: ${latestRoll.name}` : ""}</p>
      <p>{mod ? `Mod: ${mod}` : ""}</p>
      <strong data-testid="roll-result-total">
        {rolls.length > 0 ? `Total:${rolls.map((roll) => roll.value).reduce((a, b) => a + b) + mod}` : ""}
      </strong>
    </>
  );
}

export default DiceTotal;
