import { ReactElement } from "react";
import { changeName, useDice } from "../utils";

function Header(): ReactElement {
  const { inGame, name, setMyName, myName } = useDice();

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'D&D Dice',
          url: `${window.location.origin}/${inGame}`
        })
        alert('Link sent!');
      } catch(err) {
        console.error(`Failed to send! ${err}`);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/${inGame}`)
        alert('Link copied to clipboard')
      } catch (err) {
        alert(`Failed to share or copy! ${err}`)
      }
    }
  }
    
  return (
    <header className="header">
      <img src={`${process.env.PUBLIC_URL  }/logo192.png`} alt="Dice logo" className="header-logo" />
      <h1 className="header-text h1">
        D&amp;D
        <span className="highlight">
          Dice
        </span>
        {name ? ` - ${name}` : ''}
      </h1>
      <div style={{display: 'flex'}}>
        <button type="button" onClick={() => changeName(myName, setMyName)}>
          Change Name
        </button>
        <a href="/" style={{textDecoration:'none'}}>
          <button type="button" >
            {inGame && `Leave ${inGame}`}
            {!inGame && `Enter Game`}
          </button>
        </a>
        {inGame && <button type="button" style={{padding:'0rem 0.5rem'}} onClick={handleShare}>🔗</button>}
      </div>
    </header>
  );
}

export default Header;
