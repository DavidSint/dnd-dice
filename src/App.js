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

const socket = io(process.env.REACT_APP_WS_URI, {'forceNew':true})

const dice = [4,6,8,10,12,20,100];

function joinGame(socket, game, name) {
  if (game) {
    socket.emit('join game', {
      game,
      name
    });
  }
}

function App() {
  const [inGame, setInGame] = useState('')
  const [myName, setMyName] = usePersistedState('name', '');
  const [name, setName] = useState('');
  const [rolls, setRolls] = useState([]);
  const [mod, setMod] = useState(0);
  const [plannedDice, setPlannedDice] = useState([]);
  const [myMod, setMyMod] = useState(0);
  
  useEffect(() => {
    toggleGame()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  // TODO: Shift this to Indexed DB with an entry for each game
  let [savedRolls, setSavedRolls] = usePersistedState('savedRolls', []);

  function changeName() {
    const name = prompt("Please enter your character name", "")
    if (name !== null && name !== "") {
      setMyName(name)
    }
  }

  useEffect(() => {
    joinGame(socket, inGame, name)

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

  function toggleGame() {
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
      setRolls(payload.roll)
      setMod(payload.mod)
      setName(payload.name)
    });

    socket.on('connect', (msg) => {
      socket.emit('join game', {
        game: inGame,
        name
      });
    });
  });

  function resetAndRoll(dice, modifier) {
    socket.emit('new roll', {
      game: inGame,
      name: myName,
      dice,
      mod: modifier
    });
    setMod(modifier ?? 0);
    setName(myName)
  };

  function rollDice(diceWithCount, mod) {
    const dice = diceWithCount.map(die => {
      return [...Array(die.count)].map(_ => die.d)
    })
    resetAndRoll(dice.flat(), mod)
  }

  function removeASave(id) {
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
              savedRolls.map((savedRoll) => <SavedRollButton key={savedRoll.id} resetAndRoll={resetAndRoll} savedRoll={savedRoll} removeASave={removeASave} />)
            }
          </div>
          <div className="diceTotal">
            { rolls && <DiceTotal rolls={rolls} mod={mod}/> }
          </div>
          <div className="diceGrid" >
            { rolls && <DiceRoll rolls={rolls}  /> }
          </div>
          <div className="main-footer" tabIndex={-1}>
            <div className="dice">
              {/* TODO
                  Remove unused props here
              */}
              {dice.map((die) => <Dice inGame={inGame} key={`D${die}`} die={die} setPlannedDice={setPlannedDice} plannedDice={plannedDice}/>)}
            </div>
            <div className="modifier">
            { inGame &&
              <ModButton myMod={myMod} setMyMod={setMyMod} />
            }
            </div>
            <div>
              { plannedDice.length > 0 && 
                <RollButton rollDice={rollDice} plannedDice={plannedDice} mod={myMod} />
              }
            </div>
            { inGame &&
              <SaveButton savedRolls={savedRolls} setSavedRolls={setSavedRolls} mod={myMod} rolls={rolls} />
            }
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
