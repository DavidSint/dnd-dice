import React from 'react'

function Dice({ inGame, die, plannedDice: prePlannedDice, setPlannedDice, }){
  function addDie(die) {
    // TODO pass the hook functions in as well and move these functions to above component

    const [...plannedDice] = prePlannedDice
    const preExistDieIndex = plannedDice.findIndex(plan => plan.d === die)
    if (preExistDieIndex === -1) {
      plannedDice.push({
        d: die,
        count: 1
      })
    } else {
      plannedDice[preExistDieIndex] = {
        d: die,
        count: plannedDice[preExistDieIndex].count + 1
      }
    }
    setPlannedDice(plannedDice)
  }

  function removeDie(die){
    const [...plannedDice] = prePlannedDice
    const preExistDieIndex = plannedDice.findIndex(plan => plan.d === die)
    if (preExistDieIndex !== -1) {
      plannedDice[preExistDieIndex] = {
        d: die,
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
        <div 
          className="dice-item"
          role="button"
          tabIndex={0}
          onClick={() => {
            addDie(die)
            document.activeElement.blur()
          }
        }
          onContextMenu={(e) => {
            e.preventDefault();
            removeDie(die);
          }}
        >
          <img src={`${process.env.PUBLIC_URL}/dice/d${die}.png`} alt={`Roll a d${die}`} className="dice-image"/>
          <p className={`dice-text ${die === 4 && `dice-text--d${die}`}`} aria-hidden="true">{`D${die}`}</p>
          {dCount.count !== 0 &&
            <span className="dice-badge">{dCount.count}</span>
          }
        </div>
      }
    </>
  )
}

export default Dice