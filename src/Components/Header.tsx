import { ReactElement } from "react";
import { changeName, useDice } from "../utils";
import { IRecievedRoll } from "../common/types";

function showHistory(history: IRecievedRoll[]) {
  if (history.length > 0) {
    let output = "";
    history.forEach((historicRoll: IRecievedRoll) => {
      output += `${historicRoll.name}:  ${historicRoll.roll.reduce((acc, cur) => acc + cur.value, 0)} + ${
        historicRoll.mod
      } (${historicRoll.total})\n`;
    });
    return output;
  }
  return "No rolls recorded yet";
}

function Header({ rollHistory }: { rollHistory: IRecievedRoll[] }): ReactElement {
  const { inGame, name, setMyName, myName } = useDice();

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
      <h1 className="header-text h1">
        D&amp;D
        <span className="highlight">Dice</span>
        {name ? ` - ${name}` : ""}
      </h1>
      <div style={{ display: "flex" }}>
        <button type="button" onClick={() => changeName(myName, setMyName)}>
          Change Name
        </button>
        <button type="button" onClick={() => alert(showHistory(rollHistory))}>
          Roll History
        </button>
        {inGame && (
          <button type="button" style={{ padding: "0rem 0.5rem" }} onClick={handleShare}>
            🔗
          </button>
        )}
        <a href="/" style={{ textDecoration: "none" }}>
          <button type="button">
            {inGame && `Leave ${inGame}`}
            {!inGame && "Enter Game"}
          </button>
        </a>
      </div>
    </header>
  );
}

export default Header;
