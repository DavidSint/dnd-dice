import { ReactElement } from "react";
import { useDice } from "../utils";

function ModButton(): ReactElement {
  const {myMod, setMyMod} = useDice()
  return (
    <button
      type="button"
      className="mod"
      tabIndex={0}
      onContextMenu={((e) => {
        e.preventDefault();
        setMyMod(0)
      })}
      onClick={() => {
      const modifier = prompt("Please enter a modifier");
      if (modifier){
        setMyMod(parseInt(modifier, 10))
      }
    }}>
      {myMod > 0 ? `+${myMod}` : myMod || "+/-"}
    </button>
  );
}

export default ModButton;

