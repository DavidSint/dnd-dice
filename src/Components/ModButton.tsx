import { useAtom } from "jotai";
import { ReactElement } from "react";
import { myModAtom } from "../atoms";

function ModButton(): ReactElement {
  const [myMod, setMyMod] = useAtom(myModAtom);
  return (
    <button
      type="button"
      className="mod"
      tabIndex={0}
      onContextMenu={(e) => {
        e.preventDefault();
        setMyMod(0);
      }}
      data-testid="mod"
      onClick={() => {
        const modifier = prompt("Please enter a modifier");
        if (modifier) {
          setMyMod(parseInt(modifier, 10));
        }
      }}
    >
      {myMod > 0 ? `+${myMod}` : myMod || "+/-"}
    </button>
  );
}

export default ModButton;
