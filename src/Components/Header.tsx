import { Dispatch, ReactElement } from "react";

interface IHeader {
  inGame: string,
  setInGame: Dispatch<React.SetStateAction<string>>
  name: string,
  setMyName: Dispatch<React.SetStateAction<string>>,
  changeName: (myName: string, setMyName: Dispatch<React.SetStateAction<string>>) => void,
  toggleGame: (inGame: string, setInGame: Dispatch<React.SetStateAction<string>>) => void
}
function Header({ inGame, setInGame, name, setMyName, changeName, toggleGame }: IHeader): ReactElement {
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
        <button type="button" onClick={() => changeName(name, setMyName)}>
          Change Name
        </button>
        <button type="button" onClick={() => toggleGame(inGame, setInGame)}>
          {inGame && `Leave ${inGame}`}
          {!inGame && `Enter Game`}
        </button>
      </div>
    </header>
  );
}

export default Header;
