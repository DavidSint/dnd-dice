import { useState, useEffect, ReactElement } from 'react';
import { io } from 'socket.io-client';
import usePersistedState from './common/persistedState'
import { IPlannedDie, IRecievedRoll, IRoll, ISavedRoll } from './common/types';
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
import { changeName, joinGame, toggleGame, resetAndRoll, rollDice, removeASave } from './utils'

if (!process.env.REACT_APP_WS_URI) throw new Error("Missing Websocket URI, please add to websocket in environment variables.")
const socket = io(process.env.REACT_APP_WS_URI, {'forceNew':true})

const dice = [4,6,8,10,12,20,100];


// TODO Switch some props to use React Context
function App(): ReactElement {
  const [inGame, setInGame] = useState('')
  const [myName, setMyName] = usePersistedState('name', '');
  const [name, setName] = useState('');
  const [rolls, setRolls] = useState<IRoll[]>([]);
  const [mod, setMod] = useState(0);
  const [plannedDice, setPlannedDice] = useState<IPlannedDie[]>([]);
  const [myMod, setMyMod] = useState(0);
  
  // TODO: Shift this to Indexed DB with an entry for each game
  const [savedRolls, setSavedRolls] = usePersistedState<ISavedRoll[]>('savedRolls', []);

  // changeName(myName, setMyName)

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

  useEffect(() => {
    toggleGame(inGame, setInGame)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    socket.on('receive roll', (payload: IRecievedRoll) => {
      setRolls(payload.roll)
      setMod(payload.mod)
      setName(payload.name)
    });

    socket.on('connect', () => {
      socket.emit('join game', {
        game: inGame,
        name
      });
    });
  });

  return (
    <>
      <Header inGame={inGame} setInGame={setInGame} name={name} changeName={changeName} toggleGame={toggleGame} setMyName={setMyName} />

      <div className="container">
        <main className="main">
          <div className="filterScroller">
            { inGame &&
              savedRolls.map((savedRoll: ISavedRoll) => <SavedRollButton key={savedRoll.id} resetAndRoll={resetAndRoll} savedRoll={savedRoll} removeASave={removeASave} inGame={inGame} myName={myName} setMod={setMod} setName={setName} savedRolls={savedRolls} setSavedRolls={setSavedRolls} socket={socket} />)
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
              {dice.map((die) => <Dice inGame={inGame} key={`D${die}`} die={die} setPlannedDice={setPlannedDice} prePlannedDice={plannedDice}/>)}
            </div>
            <div className="modifier">
            { inGame &&
              <ModButton myMod={myMod} setMyMod={setMyMod} />
            }
            </div>
            <div>
              { plannedDice.length > 0 && 
                <RollButton rollDice={rollDice} plannedDice={plannedDice} mod={myMod} setMod={setMod} myName={myName} setName={setName} inGame={inGame} socket={socket}/>
              }
            </div>
            { inGame &&
              <SaveButton savedRolls={savedRolls} setSavedRolls={setSavedRolls} mod={myMod} dice={plannedDice}/>
            }
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
