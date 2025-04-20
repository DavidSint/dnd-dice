import confetti from "canvas-confetti";
import { useAtomValue, useSetAtom } from "jotai";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dice, DiceRoll, DiceTotal, Header, ModButton, RollButton, SaveButton, SavedRollButton } from "../Components";
import {
  inGameAtom,
  latestRollAtom,
  modAtom,
  myNameAtom,
  nameAtom,
  plannedDiceAtom,
  rollsAtom,
  savedRollsAtom,
  socketAtom,
} from "../atoms";
import { ReceivedRoll, SavedRoll } from "../common/types";

const dice = [4, 6, 8, 10, 12, 20, 100];

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// TODO: Create a dedicated useSocketHandler hook to manage socket logic
function SocketHandler() {
  const socket = useAtomValue(socketAtom);
  const inGame = useAtomValue(inGameAtom);
  const myName = useAtomValue(myNameAtom);
  const setLatestRoll = useSetAtom(latestRollAtom);
  const setRolls = useSetAtom(rollsAtom);

  useEffect(() => {
    if (!socket || !inGame || !myName) return;

    const handleConnect = () => {
      socket.emit("join game", { game: inGame, myName });
    };

    socket.emit("join game", { game: inGame, myName });
    socket.on("connect", handleConnect);

    return () => {
      socket.emit("leave game", { game: inGame, myName });
      socket.off("connect", handleConnect);
      setRolls([]);
    };
  }, [socket, inGame, myName, setRolls]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveRoll = (payload: ReceivedRoll) => {
      /*
        DO NOT PUT OTHER CODE IN HERE.
        IF YOU WANT TO DO ACTIONS ON A NEW
        ROLL PUT THE LOGIC IN A USE EFFECT
        ON LATEST ROLE BELOW
      */
      setLatestRoll(payload);
    };

    socket.on("receive roll", handleReceiveRoll);

    return () => {
      socket.off("receive roll", handleReceiveRoll);
    };
  }, [socket, setLatestRoll]);

  return null;
}

export default function Page(): ReactElement {
  const inGame = useAtomValue(inGameAtom);
  const savedRolls = useAtomValue(savedRollsAtom);
  const rolls = useAtomValue(rollsAtom);
  const plannedDice = useAtomValue(plannedDiceAtom);
  const latestRoll = useAtomValue(latestRollAtom);

  const setRolls = useSetAtom(rollsAtom);
  const setMod = useSetAtom(modAtom);
  const setName = useSetAtom(nameAtom);
  const setInGame = useSetAtom(inGameAtom);

  const [rollHistory, setRollHistory] = useState<ReceivedRoll[]>([]);

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
      const newHistory = [latestRoll, ...rollHistory];
      if (newHistory.length > 10) {
        newHistory.length = 10;
      }
      setRollHistory(newHistory);
    }
  }, [latestRoll]);

  const { gameId } = useParams();

  useEffect(() => {
    if (gameId) {
      setInGame(gameId);
      document.title = `D&D Dice - ${gameId}`;
    }
  }, [gameId, setInGame]);

  return (
    <>
      <SocketHandler />
      <Header rollHistory={rollHistory} />

      <div className="container">
        <main className="main">
          <div className="filterScroller">
            <div className="filterScroller-container">
              {inGame &&
                savedRolls.map((savedRoll: SavedRoll) => <SavedRollButton key={savedRoll.id} savedRoll={savedRoll} />)}
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
