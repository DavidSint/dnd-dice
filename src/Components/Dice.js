import React from 'react'

function Dice({ inGame, name, die, rolls, setRolls, plannedDice, setPlannedDice, }){
  function addDie(die, name) {
    // TODO No need for name here
    // TODO remove this first section
    // TODO rename arr2 to arr
    // TODO pass the hook functions in as well and move these functions to above component
    // const [...arr] = rolls;
    // arr.push({
    //   'id': `d${die}:0@${new Date().getTime()}`,
    //   'd': die,
    //   'value': 0,
    // });
    // setRolls(arr);

    const [...arr] = plannedDice
    const preExistDieIndex = arr.findIndex(plan => plan.d === die)
    if (preExistDieIndex === -1) {
      arr.push({
        d: die,
        count: 1
      })
    } else {
      arr[preExistDieIndex] = {
        d: die,
        count: arr[preExistDieIndex].count + 1
      }
    }
    setPlannedDice(arr)
  }

  function removeDie(die){
    const [...arr] = plannedDice
    const preExistDieIndex = arr.findIndex(plan => plan.d === die)
    if (preExistDieIndex !== -1) {
      arr[preExistDieIndex] = {
        d: die,
        count: arr[preExistDieIndex].count -1
      }
      if (arr[preExistDieIndex].count < 1) {
        arr.splice(preExistDieIndex, 1)
      }
    }
    setPlannedDice(arr)
  }

  const dCount = plannedDice.find(d => d.d === die) ?? { count: 0 };

  return (
    <>
      { inGame &&
        <div 
          className="dice-item"
          role="button"
          tabIndex={0}
          onClick={() => {
            addDie(die, name)
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