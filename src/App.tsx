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
  RollButton
} from './Components'
import { joinGame, toggleGame, DiceStateProvider } from './utils'

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

  const states = { inGame, setInGame, myName, setMyName, name, setName, rolls, setRolls, mod, setMod, plannedDice, setPlannedDice, myMod, setMyMod, savedRolls, setSavedRolls, socket }

  useEffect(() => {
    joinGame(socket, inGame, myName)

    return () => {
      if (inGame) {
        socket.emit('leave game', {
          game: inGame,
          myName
        })
        setRolls([])
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inGame]);

  useEffect(() => {
    toggleGame(inGame, setInGame, setMod)
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
        myName
      });
    });
  });

  return (
    <DiceStateProvider states={states} >
      <Header />

      <div className="container">
        <main className="main">
          <div className="filterScroller">
            <div className="filterScroller-container">
            { inGame &&
              savedRolls.map((savedRoll: ISavedRoll) => <SavedRollButton key={savedRoll.id} savedRoll={savedRoll} />)
            }
            </div>
          </div>
          <div className="diceTotal">
            { rolls && <DiceTotal/> }
          </div>
          <div className="diceGrid" >
            { rolls && <DiceRoll /> }
          </div>
          <div className="main-footer" tabIndex={-1}>
            <div className="dice">
              {dice.map((die) => <Dice key={`D${die}`} die={die}/>)}
            </div>
            <div className="modifier">
            { inGame &&
              <ModButton />
            }
            </div>
            <div>
              {
                plannedDice.length > 0 &&
                <RollButton />
              }
            </div>
            { inGame &&
              <SaveButton />
            }
          </div>
        </main>
      </div>
      <Footer />
    </DiceStateProvider>
  );
}

export default App;
