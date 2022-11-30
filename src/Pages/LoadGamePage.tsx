import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../Components";
import { useDice } from "../utils";

export default function LoadGamePage() {
  const { setMod } = useDice();
  const navigate = useNavigate();
  useEffect(() => {
    const gameId = prompt("Please enter a game ID", "");
    if (gameId !== null && gameId !== "") {
      navigate(gameId);
    }
    setMod(0);
  }, []);

  return (
    <>
      <Header rollHistory={[]} />

      <div className="container">
        <main className="main">
          <div className="filterScroller">
            <div className="filterScroller-container" />
          </div>
          <div className="diceTotal" />
          <div className="diceGrid" />
          <div className="main-footer" tabIndex={-1}>
            <div className="dice" />
            <div className="modifier" />
            <div />
          </div>
        </main>
      </div>
    </>
  );
}
