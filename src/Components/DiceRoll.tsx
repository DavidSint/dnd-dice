import { useAtomValue } from "jotai";
import { ReactElement } from "react";
import { rollsAtom } from "../atoms";

function DiceRoll(): ReactElement {
  const rolls = useAtomValue(rollsAtom);
  return (
    <>
      {rolls.map((roll) => (
        <div className={`die die-${roll.d}`} key={roll.id}>
          <span>D{roll.d}</span>
          <p className="die-result">{roll.value || "-"}</p>
        </div>
      ))}
    </>
  );
}

export default DiceRoll;
