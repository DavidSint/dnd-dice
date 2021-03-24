import { ReactElement } from "react";
import { changeName, toggleGame, useDice } from "../utils";

function Header(): ReactElement {
  const { inGame, setInGame, name, setMyName, myName, setMod } = useDice();
  return (
    <header className="header">
      <img src={`${process.env.PUBLIC_URL  }/logo192.png`} alt="Dice logo" className="header-logo" />
      <h1 className="header-text h1">
        {inGame || 'D&D'}
        <span className="highlight">
          Dice
        </span>
        {name ? ` - ${name}` : ''}
      </h1>
      <div style={{display: 'flex'}}>
        <button type="button" onClick={() => changeName(myName, setMyName)}>
          Change Name
        </button>
        <button type="button" onClick={() => toggleGame(inGame, setInGame, setMod)}>
          {inGame && `Leave ${inGame}`}
          {!inGame && `Enter Game`}
        </button>
      </div>
    </header>
  );
}

export default Header;
