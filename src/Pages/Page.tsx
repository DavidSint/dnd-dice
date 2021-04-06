import { useEffect, ReactElement } from 'react';
import { io } from 'socket.io-client';
import { IRecievedRoll, ISavedRoll } from '../common/types';
import {
  Header,
  DiceRoll,
  DiceTotal,
  SaveButton,
  Dice,
  ModButton,
  SavedRollButton,
  RollButton
} from '../Components'
import { useParams } from 'react-router-dom';
import { joinGame, useDice } from '../utils'

if (!process.env.REACT_APP_WS_URI) throw new Error("Missing Websocket URI, please add to websocket in environment variables.")
const socket = io(process.env.REACT_APP_WS_URI, {'forceNew':true})

const dice = [4,6,8,10,12,20,100];

// TODO Switch some props to use React Context
export default function App(): ReactElement {
  const { inGame, myName, setRolls, setInGame, setMod, setName, savedRolls, rolls, plannedDice } = useDice()
  useEffect(() => {
    joinGame(socket, inGame, myName)
    document.title = `D&D Dice - ${inGame}`

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
    document.title = "D&D Dice"
  }, [])

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
  interface IRouter {
    gameId: string
  }

  const { gameId } = useParams<IRouter>()
  setInGame(gameId)
  return (
    <>
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
            <div style={{height: '10px'}}>
            { inGame &&
              <ModButton />
            }
            </div>
            <div style={{height: '10px'}}>
              {
                plannedDice.length > 0 &&
                <RollButton />
              }
            </div>
            <div style={{height: '10px'}}>
              { inGame &&
                <SaveButton />
              }
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
