import {ISavedRoll} from '../common/types'

interface ISavedRollButton{
  resetAndRoll: (dice: number[], modifier: number) => void,
  savedRoll: ISavedRoll,
  removeASave: (id: string) => void
}
function SavedRollButton({ resetAndRoll, savedRoll, removeASave }: ISavedRollButton) {

  return (
    <button
      className="filterScroller-item"
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
  );
}

export default SavedRollButton;
