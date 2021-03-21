import { ReactElement } from "react";

interface IDiceItem {
  die: number;
  roller(die: number[]): void;
}
function DiceItem({ die, roller }: IDiceItem): ReactElement {
  return (
    <button
      className="dice-item"
      type="button"
      tabIndex={0}
      onClick={() => {
        roller([die]);
        (document.activeElement as HTMLElement).blur()
      }
    }>
      <img src={`${process.env.PUBLIC_URL}/dice/d${die}.png`} alt={`Roll a d${die}`} className="dice-image"/>
      <p className={`dice-text ${die === 4 ? `dice-text--d${die}` : ""}`} aria-hidden="true">{`D${  die}`}</p>
    </button>
  );
}

export default DiceItem;