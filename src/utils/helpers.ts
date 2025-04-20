import { Socket } from "socket.io-client";
import { PlannedDie, SavedRoll } from "../common/types";

export function promptForName(currentName: string): string | null {
  const name = prompt("Please enter your character name", currentName || "Anon");
  if (name !== null && name !== "") {
    return name;
  }
  return null;
}

interface NewRollArgs {
  socket: Socket;
  dice: number[];
  modifier: number;
  inGame: string;
  myName: string;
}
export function emitNewRoll({ socket, dice, modifier, inGame, myName }: NewRollArgs): void {
  socket.emit("new roll", {
    game: inGame,
    name: myName,
    dice,
    mod: modifier,
  });
}

interface RollPlannedDiceArgs {
  socket: Socket;
  plannedDice: PlannedDie[];
  mod: number;
  inGame: string;
  myName: string;
}
export function rollPlannedDice({ socket, plannedDice, mod, inGame, myName }: RollPlannedDiceArgs): void {
  const dice = plannedDice.flatMap((die) => [...Array(die.count)].map(() => die.d));
  emitNewRoll({ socket, dice, modifier: mod, inGame, myName });
}

interface FilterSavedRollsArgs {
  id: string;
  savedRolls: SavedRoll[];
}
export function filterSavedRolls({ id, savedRolls }: FilterSavedRollsArgs): SavedRoll[] {
  return savedRolls.filter((save: SavedRoll) => save.id !== id);
}
