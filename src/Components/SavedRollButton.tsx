import { Dispatch, ReactElement } from 'react';
import {ISavedRoll, IResetAndRoll, IRemoveASave} from '../common/types'

interface ISavedRollButton{
  resetAndRoll: ({ dice, modifier, inGame, myName, setMod, setName }: IResetAndRoll) => void,
  savedRoll: ISavedRoll,
  removeASave: ({id, savedRolls , setSavedRolls }: IRemoveASave) => void,
  inGame: string,
  myName: string,
  setMod: Dispatch<React.SetStateAction<number>>,
  setName: Dispatch<React.SetStateAction<string>>,
  savedRolls: ISavedRoll[],
  setSavedRolls: Dispatch<React.SetStateAction<ISavedRoll[]>>,
  socket: SocketIOClient.Socket
}
function SavedRollButton({
  resetAndRoll,
  savedRoll,
  removeASave,
  inGame,
  myName,
  setMod,
  setName,
  savedRolls,
  setSavedRolls,
  socket
}: ISavedRollButton): ReactElement {
  return (
    <button
      type="button"
      className="filterScroller-item"
      tabIndex={0}
      onClick={ () => {
        resetAndRoll({
          dice: savedRoll.dice,
          modifier: savedRoll.mod,
          inGame,
          myName,
          setMod,
          setName,
          socket
        });
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        removeASave({
          id: savedRoll.id,
          savedRolls,
          setSavedRolls
        });
      }}
    >
      {savedRoll.name}
    </button>
  );
}

export default SavedRollButton;
