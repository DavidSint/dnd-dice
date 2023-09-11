import { Dispatch } from "react";
import { Socket } from "socket.io-client";
import { IRemoveASave, IResetAndRoll, IRollDice, ISavedRoll } from "../common/types";

export function changeName(myName: string, setMyName: Dispatch<React.SetStateAction<string>>): void {
  const name = prompt("Please enter your character name", myName || "Anon");
  if (name !== null && name !== "") {
    setMyName(name);
  }
}

export function joinGame(socket: Socket, game: string, name: string): void {
  if (game) {
    socket.emit("join game", {
      game,
      name,
    });
  }
}

export function resetAndRoll({ socket, dice, modifier, inGame, myName, setMod, setName }: IResetAndRoll): void {
  socket.emit("new roll", {
    game: inGame,
    name: myName,
    dice,
    mod: modifier,
  });
  setMod(modifier ?? 0);
  setName(myName);
}

export function rollDice({ plannedDice, mod, inGame, myName, setMod, setName, socket }: IRollDice): void {
  const dice = plannedDice.map((die) => [...Array(die.count)].map((_) => die.d));
  resetAndRoll({ dice: dice.flat(), modifier: mod, inGame, myName, setMod, setName, socket });
}

export function removeASave({ id, savedRolls, setSavedRolls }: IRemoveASave): void {
  const [...arr] = savedRolls;
  setSavedRolls(arr.filter((save: ISavedRoll) => save.id !== id));
}
