import React from 'react';

function ModButton(props) {
  const { setMod } = props

  return (
    <button className="mod" tabIndex={0} onClick={() => {
      const modifier = prompt("Please enter a modifier");
      if (modifier){
        setMod(parseInt(modifier, 10))
      };
    }}>
      +/-
    </button>
  );
}

export default ModButton;

