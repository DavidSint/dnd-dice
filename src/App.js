import React, { useState, useEffect } from 'react';
import DiceRoll from './Components/DiceRoll';
import DiceTotal from './Components/DiceTotal';
import Footer from './Components/Footer';
import SaveButton from './Components/SaveButton';
import Dice from './Components/Dice';


// import { IRoll, ISavedRoll, IGameProps, IRollProps, IReturnedRolls } from "./common/types";
import io from 'socket.io-client';
import RollButton from './Components/RollButton';

const socket = io(process.env.REACT_APP_WS_URI)

const dice = [4,6,8,10,12,20,100];

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    () => {
      try {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
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
  const [inGame, setInGame] = useState('')
  const [myName, setMyName] = usePersistedState('name', '');
  const [name, setName] = useState('');
  const [rolls, setRolls] = useState([]);
  const [mod, setMod] = useState(0);
  
  useEffect(() => {
    toggleGame()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  // TODO: Shift this to Indexed DB with an entry for each game
  let [savedRolls, setSavedRolls] = usePersistedState('savedRolls', []);

  const changeName = () => {
    const name = prompt("Please enter your character name", "")
    if (name !== null && name !== "") {
      setMyName(name)
    }
  }

  useEffect(() => {
    if (inGame) {
      socket.emit('join game', { 
        game: inGame, 
        name 
      });
    }

    return () => {
      if (inGame) {
        socket.emit('leave game', {
          game: inGame,
          name
        })
        setRolls([])
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inGame]);

  const toggleGame = () => {
    if (inGame) {
      setInGame('')
    } else {
    const gameId = prompt("Please enter a game id", "")
      if (gameId !== null && gameId !== "") {
        setInGame(gameId);
      }
    }
  }

  useEffect(() => {
    socket.on('receive roll', (payload) => {
      setRolls(payload[0].roll)
      setMod(payload[0].mod)
      setName(payload[0].name)
    });
  });

  const resetAndRoll = (dice, modifier) => {
    socket.emit('new roll', {
      game: inGame,
      name: myName,
      dice,
      mod: modifier
    });
    setMod(modifier ?? 0);
    setName(myName)
  };

  const removeADie = (id) => {
    const [...arr] = rolls;
    setRolls(arr.filter((die) => die.id !== id));
  }

  const removeASave = (id) => {
    const [...arr] = savedRolls;
    setSavedRolls(arr.filter((save) => save.id !== id));
  }

  return (
    <>
      <header className="header">
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Dice logo" className="header-logo"></img>
        <h1 className="header-text h1">
          {inGame || 'D&D'}
          <span className="highlight">
            Dice
          </span>
          {name ? ` - ${name}` : ''}
        </h1>
        <div style={{display: 'flex'}}>
          <button onClick={() => changeName()}>
            Change Name
          </button>
          <button onClick={() => toggleGame()}>
            {inGame && `Leave ${inGame}`}
            {!inGame && `Enter Game`}
          </button>
        </div>
      </header>

      <div className="container">
        <main className="main">
          <div className="filterScroller">
            { inGame &&
              savedRolls.map((savedRoll, i) => {
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
              {dice.map((die, i) => <Dice inGame={inGame} key={i} die={die} name={name} rolls={rolls} setRolls={setRolls}/>)}
            </div>
            <div className="modifier">
            { inGame &&
              <button className="mod" tabIndex={0} onClick={() => {
                const modifier = prompt("Please enter a modifier");
                if (modifier){
                  setMod(parseInt(modifier, 10))
                };
              }}>+/-</button>
            }
            </div>
            <div>
              { rolls.length>0 && 
                <RollButton resetAndRoll={resetAndRoll} rolls={rolls} mod={mod}/>
              }
            </div>
            { inGame &&
              <SaveButton savedRolls={savedRolls} setSavedRolls={setSavedRolls} mod={mod} rolls={rolls} />
            }
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
