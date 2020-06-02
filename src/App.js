import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import usePersistedState from './common/persistedState'

import {
  Header,
  DiceRoll,
  DiceTotal,
  Footer,
  SaveButton,
  Dice,
  ModButton,
  SavedRollButton,
  RollButton,
} from './Components'

// import Header from './Components/Header';
// import DiceRoll from './Components/DiceRoll';
// import DiceTotal from './Components/DiceTotal';
// import Footer from './Components/Footer';
// import SaveButton from './Components/SaveButton';
// import Dice from './Components/Dice';
// import ModButton from './Components/ModButton';
// import SavedRollButton from './Components/SavedRollButton';
// import RollButton from './Components/RollButton';

// import { IRoll, ISavedRoll, IGameProps, IRollProps, IReturnedRolls } from "./common/types";

const socket = io(process.env.REACT_APP_WS_URI)

const dice = [4,6,8,10,12,20,100];

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
      <Header inGame={inGame} name={name} changeName={changeName} toggleGame={toggleGame} />

      <div className="container">
        <main className="main">
          <div className="filterScroller">
            { inGame &&
              savedRolls.map((savedRoll, i) => <SavedRollButton i={i} resetAndRoll={resetAndRoll} savedRoll={savedRoll} removeASave={removeASave} />)
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
              <ModButton setMod={setMod} />
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
