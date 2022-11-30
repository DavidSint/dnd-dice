/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ReactElement } from "react";
import { io } from "socket.io-client";
import { IRecievedRoll, ISavedRoll } from "../common/types";
import { Header, DiceRoll, DiceTotal, SaveButton, Dice, ModButton, SavedRollButton, RollButton } from "../Components";
import { useParams } from "react-router-dom";
import { joinGame, useDice } from "../utils";
import confetti from "canvas-confetti";

if (!import.meta.env.VITE_WS_URI) {
  throw new Error("Missing Websocket URI, please add to websocket in environment variables.");
}
const socket = io(import.meta.env.VITE_WS_URI, { forceNew: true });

const dice = [4, 6, 8, 10, 12, 20, 100];

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Page(): ReactElement {
  const { inGame, myName, setRolls, setInGame, setMod, setName, savedRolls, rolls, plannedDice } = useDice();

  useEffect(() => {
    joinGame(socket, inGame, myName);
    document.title = `D&D Dice - ${inGame}`;

    socket.on("connect", () => {
      socket.emit("join game", {
        game: inGame,
        myName,
      });
    });

    return () => {
      if (inGame) {
        socket.emit("leave game", {
          game: inGame,
          myName,
        });
        setRolls([]);
      }
    };
  }, [inGame]);

  const [latestRoll, setLatestRoll] = useState<IRecievedRoll | null>(null);
  const [rollHistory, setRollHistory] = useState<IRecievedRoll[]>([]);
  useEffect(() => {
    socket.on("receive roll", (payload: IRecievedRoll) => {
      /*
        DO NOT PUT OTHER CODE IN HERE.
        IF YOU WANT TO DO ACTIONS ON A NEW
        ROLL PUT THE LOGIC IN A USE EFFECT
        ON LATEST ROLE BELOW
      */
      setLatestRoll(payload);
    });
  });

  useEffect(() => {
    if (latestRoll !== null) {
      setRolls(latestRoll.roll);
      setMod(latestRoll.mod);
      setName(latestRoll.name);
      // If the roll contains a natural max roll, show confetti on the page!
      if (latestRoll.roll.filter((roll) => roll.d === roll.value).length > 0) {
        const duration = 1 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 0,
        };

        const interval: NodeJS.Timeout = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);

          confetti({
            ...defaults,
            particleCount,
            origin: {
              x: randomInRange(0.1, 0.3),
              y: Math.random() - 0.2,
            },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: {
              x: randomInRange(0.7, 0.9),
              y: Math.random() - 0.2,
            },
          });
        }, 250);
      }
      if (rollHistory.length > 9) {
        rollHistory.length = 9;
      }
      setRollHistory([latestRoll, ...rollHistory]);
    }
  }, [latestRoll]);

  const { gameId } = useParams();

  useEffect(() => {
    if (gameId) {
      setInGame(gameId);
    }
  }, [gameId]);
  return (
    <>
      <Header rollHistory={rollHistory} />

      <div className="container">
        <main className="main">
          <div className="filterScroller">
            <div className="filterScroller-container">
              {inGame &&
                savedRolls.map((savedRoll: ISavedRoll) => <SavedRollButton key={savedRoll.id} savedRoll={savedRoll} />)}
            </div>
          </div>
          <div className="diceTotal">{rolls && <DiceTotal />}</div>
          <div className="diceGrid">{rolls && <DiceRoll />}</div>
          <div className="main-footer" tabIndex={-1}>
            <div className="dice">
              {dice.map((die) => (
                <Dice key={`D${die}`} die={die} />
              ))}
            </div>
            <div style={{ height: "10px" }}>{inGame && <ModButton />}</div>
            <div style={{ height: "10px" }}>{plannedDice.length > 0 && <RollButton />}</div>
            <div style={{ height: "10px" }}>{inGame && <SaveButton />}</div>
          </div>
        </main>
      </div>
    </>
  );
}
