import React from 'react'

function Dice(props){
  const { inGame, name, die, rolls, setRolls } = props

  const addDie = (die, name) => {
    const [...arr] = rolls;
    arr.push({
      'id': `d${die}:0@${new Date().getTime()}`,
      'd': die,
      'value': 0,
    });
    setRolls(arr);
  }

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
        }>
          <img src={`${process.env.PUBLIC_URL}/dice/d${die}.png`} alt={`Roll a d${die}`} className="dice-image"/>
          <p className={`dice-text ${die === 4 ? `dice-text--d${die}` : ""}`} aria-hidden="true">{`D${die}`}</p>
        </div>
      }
    </>
  )
}

export default Dice