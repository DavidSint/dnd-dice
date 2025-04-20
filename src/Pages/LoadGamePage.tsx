import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../Components";
import { modAtom } from "../atoms";

export default function LoadGamePage() {
  const setMod = useSetAtom(modAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setMod(0);
    let gameId = prompt("Please enter a game ID", "");
    while (!gameId) {
      gameId = prompt("You must enter a game ID. Please enter a game ID or close the tab/window.", "");
    }
    if (gameId !== null && gameId !== "") {
      navigate(`/${gameId.trim()}`);
    }
  }, [navigate, setMod]);

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
