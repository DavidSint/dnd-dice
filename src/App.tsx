import { useState, ReactElement } from "react";
import { io } from "socket.io-client";
import usePersistedState from "./common/persistedState";
import { IPlannedDie, IRoll, ISavedRoll } from "./common/types";
import { Footer } from "./Components";
import { DiceStateProvider } from "./utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadGamePage, Page } from "./Pages";

if (!import.meta.env.VITE_WS_URI) {
  throw new Error("Missing Websocket URI, please add to websocket in environment variables.");
}
const socket = io(import.meta.env.VITE_WS_URI, { forceNew: true });

function App(): ReactElement {
  const [inGame, setInGame] = useState("");
  const [myName, setMyName] = usePersistedState("name", "");
  const [name, setName] = useState("");
  const [rolls, setRolls] = useState<IRoll[]>([]);
  const [mod, setMod] = useState(0);
  const [plannedDice, setPlannedDice] = useState<IPlannedDie[]>([]);
  const [myMod, setMyMod] = useState(0);

  // TODO: Shift this to Indexed DB with an entry for each game
  const [savedRolls, setSavedRolls] = usePersistedState<ISavedRoll[]>("savedRolls", []);

  const states = {
    inGame,
    setInGame,
    myName,
    setMyName,
    name,
    setName,
    rolls,
    setRolls,
    mod,
    setMod,
    plannedDice,
    setPlannedDice,
    myMod,
    setMyMod,
    savedRolls,
    setSavedRolls,
    socket,
  };

  return (
    <DiceStateProvider states={states}>
      <Router>
        <Routes>
          <Route path="/" element={<LoadGamePage />} />
          <Route path="/:gameId" element={<Page />} />
        </Routes>
        <Footer />
      </Router>
    </DiceStateProvider>
  );
}

export default App;
