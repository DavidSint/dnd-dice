import React from 'react';

function ModButton({ myMod, setMyMod }) {
  return (
    <button className="mod" tabIndex={0} onClick={() => {
      const modifier = prompt("Please enter a modifier");
      if (modifier){
        setMyMod(parseInt(modifier, 10))
      };
    }}>
      {myMod
        ? myMod > 0 ? `+${myMod}` : myMod
        : "+/-"}
    </button>
  );
}

export default ModButton;

