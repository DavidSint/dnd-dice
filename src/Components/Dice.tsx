import { useAtom, useAtomValue } from "jotai";
import { ReactElement } from "react";
import { inGameAtom, plannedDiceAtom } from "../atoms";
import { PlannedDie } from "../common/types";

function Dice({ die }: { die: number }): ReactElement {
  const inGame = useAtomValue(inGameAtom);
  const [prePlannedDice, setPlannedDice] = useAtom(plannedDiceAtom);

  function addDie(d: number) {
    // TODO pass the hook functions in as well and move these functions to above component

    const plannedDice = [...prePlannedDice];
    const preExistDieIndex = plannedDice.findIndex((plan) => plan.d === d);
    if (preExistDieIndex === -1) {
      plannedDice.push({
        d,
        count: 1,
      });
    } else {
      plannedDice[preExistDieIndex] = {
        d,
        count: plannedDice[preExistDieIndex].count + 1,
      };
    }
    setPlannedDice(plannedDice);
  }

  function removeDie(d: number) {
    const plannedDice = [...prePlannedDice];
    const preExistDieIndex = plannedDice.findIndex((plan) => plan.d === d);
    if (preExistDieIndex !== -1) {
      plannedDice[preExistDieIndex] = {
        d,
        count: plannedDice[preExistDieIndex].count - 1,
      };
      if (plannedDice[preExistDieIndex].count < 1) {
        plannedDice.splice(preExistDieIndex, 1);
      }
    }
    setPlannedDice(plannedDice);
  }

  const dCount = prePlannedDice.find((d: PlannedDie) => d.d === die)?.count || 0;

  return (
    <>
      {inGame && (
        <button
          className="dice-item"
          type="button"
          tabIndex={0}
          data-testid={`D${die}`}
          onClick={() => {
            addDie(die);
            if (document.activeElement !== null) {
              (document.activeElement as HTMLElement).blur();
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            removeDie(die);
          }}
        >
          <img src={`/dice/d${die}.png`} alt={`Roll a d${die}`} className="dice-image" />
          <p className={`dice-text ${die === 4 && `dice-text--d${die}`}`} aria-hidden="true">{`D${die}`}</p>
          {dCount !== 0 && <span className="dice-badge">{dCount}</span>}
        </button>
      )}
    </>
  );
}

export default Dice;
