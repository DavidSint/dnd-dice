import { ReactElement } from "react";
import { useDice } from "../utils";

function DiceTotal(): ReactElement {
  const { rolls, mod } = useDice();
  return (
    <>
      <p>{mod ? `Mod: ${mod}` : ""}</p>
      <strong>
        {rolls.length > 0 ? `Total:${rolls.map((roll) => roll.value).reduce((a, b) => a + b) + mod}` : ""}
      </strong>
    </>
  );
}

export default DiceTotal;
