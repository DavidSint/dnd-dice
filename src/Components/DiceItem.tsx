interface IDiceItem {
  die: number;
  roller(die: number[]): void;
}
function DiceItem({ die, roller }: IDiceItem) {
  return (
    <div 
      className="dice-item"
      role="button"
      tabIndex={0}
      onClick={() => {
        roller([die]);
        (document.activeElement as HTMLElement).blur()
      }
    }>
      <img src={`${process.env.PUBLIC_URL}/dice/d${die}.png`} alt={`Roll a d${die}`} className="dice-image"/>
      <p className={`dice-text ${die === 4 ? `dice-text--d${die}` : ""}`} aria-hidden="true">{"D" + die}</p>
    </div>
  );
}

export default DiceItem;