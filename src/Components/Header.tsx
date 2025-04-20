import { useAtom, useAtomValue } from "jotai";
import { ReactElement } from "react";
import { inGameAtom, myNameAtom } from "../atoms";
import { ReceivedRoll } from "../common/types";
import { promptForName } from "../utils/helpers";

function showHistory(history: ReceivedRoll[]) {
  if (history.length > 0) {
    let output = "";
    for (const historicRoll of history) {
      output += `${historicRoll.name}: ${historicRoll.roll.reduce((acc, cur) => acc + cur.value, 0)} + ${
        historicRoll.mod
      } (${historicRoll.total})\n`;
    }
    return output;
  }
  return "No rolls recorded yet";
}

function Header({ rollHistory }: { rollHistory: ReceivedRoll[] }): ReactElement {
  const [myName, setMyName] = useAtom(myNameAtom);
  const inGame = useAtomValue(inGameAtom);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "D&D Dice",
          url: `${window.location.origin}/${inGame}`,
        });
        alert("Link sent!");
      } catch (err) {
        console.error(`Failed to send! ${err}`);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/${inGame}`);
        alert("Link copied to clipboard");
      } catch (err) {
        alert(`Failed to share or copy! ${err}`);
      }
    }
  }

  return (
    <header className="header">
      <img src={"/logo192.png"} alt="Dice logo" className="header-logo" />
      <h1 className="header-text h1" data-testid="heading">
        D&amp;D
        <span className="highlight">Dice</span>
        {inGame ? ` - ${inGame}` : ""}
      </h1>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          data-testid="change-name"
          onClick={() => {
            let newName: string | null = myName;
            newName = promptForName(myName) ?? myName;
            if (newName !== null) {
              setMyName(newName);
            }
          }}
        >
          {myName}
        </button>
        <button type="button" data-testid="roll-history" onClick={() => alert(showHistory(rollHistory))}>
          Roll History
        </button>
        {inGame && (
          <button type="button" data-testid="share-link" style={{ padding: "0rem 0.5rem" }} onClick={handleShare}>
            🔗
          </button>
        )}
        <a href="/" style={{ textDecoration: "none" }}>
          <button type="button" data-testid="leave-game">
            {inGame && `Leave ${inGame}`}
            {!inGame && "Enter Game"}
          </button>
        </a>
      </div>
    </header>
  );
}

export default Header;
