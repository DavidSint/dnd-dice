import React from 'react';

function Header(props) {
  const { inGame, name, changeName, toggleGame } = props

  return (
    <header className="header">
      <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Dice logo" className="header-logo"></img>
      <h1 className="header-text h1">
        {inGame || 'D&D'}
        <span className="highlight">
          Dice
        </span>
        {name ? ` - ${name}` : ''}
      </h1>
      <div style={{display: 'flex'}}>
        <button onClick={() => changeName()}>
          Change Name
        </button>
        <button onClick={() => toggleGame()}>
          {inGame && `Leave ${inGame}`}
          {!inGame && `Enter Game`}
        </button>
      </div>
    </header>
  );
}

export default Header;
