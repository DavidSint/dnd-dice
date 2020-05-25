import React, { useState, useEffect } from 'react';
import getRandom from './helpers/random';
import DiceItem from './Components/DiceItem';
import DiceRoll from './Components/DiceRoll';
import DiceTotal from './Components/DiceTotal';
import { IRoll, ISavedRoll } from "./common/types";

const dice: number[] = [4,6,8,10,12,20,100];

function usePersistedState(key: string, defaultValue: any) {
  const [state, setState] = useState(
    () => {
      try {
        return JSON.parse(localStorage.getItem(key)!) || defaultValue;
      } catch { 
        return defaultValue;
      }
    }
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

function App() {
  const [savedRolls, setSavedRolls] = usePersistedState('savedRolls', []);
  const [rolls, setRolls] = useState<IRoll[]>([]);
  const [mod, setMod] = useState(0);

  const rollDice = (dice: number[]) => {
    const [...arr]: Array<IRoll> = rolls;
    dice.forEach(
      die => {
        const newRoll = getRandom(die);
        arr.push({
          'id': `d${die}:${newRoll}@${new Date().getTime()}`,
          'd': die,
          'value': newRoll,
        });
        setRolls(arr);
      }
    )
  }

  const resetAndRoll = (dice: number[], modifier: number) => {
    const arr: IRoll[] = [];
    dice.forEach(
      die => {
        const newRoll = getRandom(die);
        arr.push({
          'id': `d${die}:${newRoll}@${new Date().getTime()}`,
          'd': die,
          'value': newRoll,
        });
        setRolls(arr);
        setMod(modifier ?? 0);
      }
    )
  };

  const removeADie = (id: string) => {
    const [...arr] = rolls;
    setRolls(arr.filter((die) => die.id !== id));
  }

  const removeASave = (id: string) => {
    const [...arr]: Array<IRoll> = savedRolls;
    setSavedRolls(arr.filter((save) => save.id !== id));
  }

  return (
    <>
      <header className="header">
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Dice logo" className="header-logo"></img>
        <h1 className="header-text h1">D&D <span className="highlight">Dice</span></h1>
      </header>

      <div className="container">
        <main className="main">
          <div className="filterScroller">
            {
              savedRolls.map((savedRoll: ISavedRoll, i: number) => {
                return <button
                  className="filterScroller-item" 
                  key={i}
                  tabIndex={0}
                  onClick={ () => {
                    resetAndRoll(savedRoll.dice, savedRoll.mod);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    removeASave(savedRoll.id);
                  }}
                >
                  {savedRoll.name}
                </button>
              })
            }
          </div>
          <div className="diceTotal">
            { rolls ? <DiceTotal rolls={rolls} mod={mod}/>: "" }
          </div>
          <div className="diceGrid" >
            { rolls ? <DiceRoll rolls={rolls} removeADie={removeADie}  /> : "" }
          </div>
          <div className="main-footer" tabIndex={-1}>
            <div className="dice">
              {dice.map((die, i) => <DiceItem die={die} key={i} roller={rollDice} />)}
            </div>
            <div className="modifier">
            <button className="mod" tabIndex={0} onClick={() => {
              const modifier = prompt("Please enter a modifier");
              if (modifier){
                setMod(parseInt(modifier, 10))
              };
            }}>+/-</button>
            </div>
            <button 
              className="roll"
              tabIndex={0}
              onClick={ () => {
                resetAndRoll(rolls.map(roll => roll.d), mod);
              }}
            >
              Roll
            </button>
            <button className="save" tabIndex={0}onClick={() => {
              const [...arr] = savedRolls;
              const name = prompt("Please enter the name");
              if (name) {
                const newSavedRoll = {"id": `@${new Date().getTime()}`, "name": name, "mod": mod?mod:0, "dice":rolls?rolls.map(roll => roll.d):[]};
                arr.push(newSavedRoll)
                setSavedRolls(arr)
              }
            }}>
              Save As
            </button>
          </div>
        </main>
      </div>

      <footer className="footer">
        <code className="footer-text"> <span className="footer-text--pre">Made by</span> <span className="highlight">David Sint</span></code>
      </footer>
    </>
  );
}

export default App;