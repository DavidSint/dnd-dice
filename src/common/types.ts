import { Dispatch } from "react";

export interface IRoll {
  id: string;
  value: number;
  d: number;
}
export interface ISavedRoll {
  id: string;
  name: string;
  mod: number;
  dice: number[];
}
export interface IPlannedDie {
  d: number,
  count: number
}
export interface IRecievedRoll {
  game: string,
  name: string,
  roll: IRoll[],
  mod: number,
  total: number
}
export interface IResetAndRoll {
  socket: SocketIOClient.Socket,
  dice: number[],
  modifier: number,
  inGame: string,
  myName: string,
  setMod: Dispatch<React.SetStateAction<number>>,
  setName: Dispatch<React.SetStateAction<string>>
}

export interface IRollDice {
  plannedDice: IPlannedDie[],
  mod: number,
  inGame: string,
  myName: string,
  setMod: Dispatch<React.SetStateAction<number>>,
  setName: Dispatch<React.SetStateAction<string>>,
  socket: SocketIOClient.Socket,
}

export interface IRemoveASave {
  id: string,
  savedRolls: ISavedRoll[],
  setSavedRolls: Dispatch<React.SetStateAction<ISavedRoll[]>>
}