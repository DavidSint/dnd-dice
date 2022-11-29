import { ReactElement } from "react"
import { useDice } from "../utils"

interface IDice {
  die: number,
}
function Dice({ die }: IDice): ReactElement {
  const { inGame, plannedDice: prePlannedDice, setPlannedDice } = useDice()
  function addDie(d: number) {
    // TODO pass the hook functions in as well and move these functions to above component

    const [...plannedDice] = prePlannedDice
    const preExistDieIndex = plannedDice.findIndex(plan => plan.d === d)
    if (preExistDieIndex === -1) {
      plannedDice.push({
        d,
        count: 1
      })
    } else {
      plannedDice[preExistDieIndex] = {
        d,
        count: plannedDice[preExistDieIndex].count + 1
      }
    }
    setPlannedDice(plannedDice)
  }

  function removeDie(d: number){
    const [...plannedDice] = prePlannedDice
    const preExistDieIndex = plannedDice.findIndex(plan => plan.d === d)
    if (preExistDieIndex !== -1) {
      plannedDice[preExistDieIndex] = {
        d,
        count: plannedDice[preExistDieIndex].count -1
      }
      if (plannedDice[preExistDieIndex].count < 1) {
        plannedDice.splice(preExistDieIndex, 1)
      }
    }
    setPlannedDice(plannedDice)
  }

  const dCount = prePlannedDice.find(d => d.d === die) ?? { count: 0 };

  return (
    <>
      { inGame &&
        <button 
          className="dice-item"
          type="button"
          tabIndex={0}
          onClick={() => {
            addDie(die)
            if (document.activeElement !== null) {
              (document.activeElement as HTMLElement).blur()
            }
          }
        }
          onContextMenu={(e) => {
            e.preventDefault();
            removeDie(die);
          }}
        >
          <img src={`/dice/d${die}.png`} alt={`Roll a d${die}`} className="dice-image"/>
          <p className={`dice-text ${die === 4 && `dice-text--d${die}`}`} aria-hidden="true">{`D${die}`}</p>
          {dCount.count !== 0 &&
            <span className="dice-badge">{dCount.count}</span>
          }
        </button>
      }
    </>
  )
}

export default Dice