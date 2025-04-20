import { Dispatch } from "react";
import { Socket } from "socket.io-client";

export interface Roll {
  id: string;
  value: number;
  d: number;
}
export interface SavedRoll {
  id: string;
  name: string;
  mod: number;
  dice: number[];
}
export interface PlannedDie {
  d: number;
  count: number;
}
export interface ReceivedRoll {
  game: string;
  name: string;
  roll: Roll[];
  mod: number;
  total: number;
}
export interface ResetAndRoll {
  socket: Socket;
  dice: number[];
  modifier: number;
  inGame: string;
  myName: string;
  setMod: Dispatch<React.SetStateAction<number>>;
  setName: Dispatch<React.SetStateAction<string>>;
}

export interface RollDice {
  plannedDice: PlannedDie[];
  mod: number;
  inGame: string;
  myName: string;
  setMod: Dispatch<React.SetStateAction<number>>;
  setName: Dispatch<React.SetStateAction<string>>;
  socket: Socket;
}

export interface RemoveASave {
  id: string;
  savedRolls: SavedRoll[];
  setSavedRolls: Dispatch<React.SetStateAction<SavedRoll[]>>;
}
