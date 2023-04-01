import { createContext, Dispatch, ReactElement, SetStateAction, useContext } from "react";
import { Socket } from "socket.io-client";
import { IPlannedDie, IRoll, ISavedRoll } from "../common/types";

interface IUseDice {
  inGame: string;
  setInGame: Dispatch<SetStateAction<string>>;
  myName: string;
  setMyName: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  rolls: IRoll[];
  setRolls: Dispatch<SetStateAction<IRoll[]>>;
  mod: number;
  setMod: Dispatch<SetStateAction<number>>;
  plannedDice: IPlannedDie[];
  setPlannedDice: Dispatch<SetStateAction<IPlannedDie[]>>;
  myMod: number;
  setMyMod: Dispatch<SetStateAction<number>>;
  savedRolls: ISavedRoll[];
  setSavedRolls: Dispatch<React.SetStateAction<ISavedRoll[]>>;
  socket: Socket;
}

const LocalStateContext = createContext<IUseDice | null>(null);
const LocalStateProvider = LocalStateContext.Provider;

function DiceStateProvider({ children, states }: { children: ReactElement | ReactElement[]; states: IUseDice }) {
  return (
    <LocalStateProvider
      value={{
        ...states,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function isProviderType(value: IUseDice | null): value is IUseDice {
  return value !== null;
}

function useDice() {
  const all = useContext<IUseDice | null>(LocalStateContext);
  if (!isProviderType(all)) {
    throw new Error("The component must be used within a DiceStateProvider");
  }
  return all;
}

export { DiceStateProvider, useDice };
